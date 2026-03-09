/**
 * @jest-environment node
 */
import { validateOTP } from "../validateOTP";

const mockCookies = jest.fn();
const mockFetch = jest.fn();

jest.mock("next/headers", () => ({
  cookies: () => mockCookies(),
}));

(global as unknown as { fetch: typeof mockFetch }).fetch = mockFetch;

beforeEach(() => {
  mockCookies.mockReset();
  mockFetch.mockReset();
  process.env = { ...process.env, NODE_ENV: "production" };
});

describe("validateOTP", () => {
  describe("validation", () => {
    it("returns error when code is not 6 chars", async () => {
      const formData = new FormData();
      formData.set("code", "12345");

      const result = await validateOTP(
        { ok: false, success: null, error: {} },
        formData,
      );

      expect(result.ok).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("returns error when code has invalid chars", async () => {
      const formData = new FormData();
      formData.set("code", "12345a");

      const result = await validateOTP(
        { ok: false, success: null, error: {} },
        formData,
      );

      expect(result.ok).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("accepts valid 6-char uppercase alphanumeric code", async () => {
      const formData = new FormData();
      formData.set("code", "ABC123");
      mockCookies.mockResolvedValue({
        get: (name: string) =>
          name === "access_token" ? { value: "token" } : undefined,
      });
      mockFetch.mockResolvedValue({ ok: true });

      const result = await validateOTP(
        { ok: false, success: null, error: {} },
        formData,
      );

      expect(result.ok).toBe(true);
    });
  });

  describe("API flow", () => {
    it("returns ok: true when validation API returns ok", async () => {
      const formData = new FormData();
      formData.set("code", "123456");
      mockCookies.mockResolvedValue({
        get: (name: string) =>
          name === "access_token"
            ? { value: "access" }
            : name === "refresh_token"
              ? undefined
              : undefined,
      });
      mockFetch.mockResolvedValue({ ok: true });

      const result = await validateOTP(
        { ok: false, success: null, error: {} },
        formData,
      );

      expect(result).toEqual({ ok: true, success: null, error: null });
    });

    it("retries with refresh token when access_token missing or 401", async () => {
      const formData = new FormData();
      formData.set("code", "123456");
      mockCookies.mockResolvedValue({
        get: (name: string) =>
          name === "access_token"
            ? { value: "expired" }
            : name === "refresh_token"
              ? { value: "refresh" }
              : undefined,
      });
      mockFetch
        .mockResolvedValueOnce({ ok: false, status: 401 })
        .mockResolvedValueOnce({
          ok: true,
          headers: new Headers({
            "set-cookie":
              "access_token=new_access; Path=/; HttpOnly, refresh_token=rr; Path=/",
          }),
        })
        .mockResolvedValueOnce({ ok: true });

      const result = await validateOTP(
        { ok: false, success: null, error: {} },
        formData,
      );

      expect(result.ok).toBe(true);
      expect(mockFetch).toHaveBeenCalledTimes(3);
    });

    it("returns session expired error when 401 and no refresh", async () => {
      const formData = new FormData();
      formData.set("code", "123456");
      mockCookies.mockResolvedValue({
        get: (name: string) =>
          name === "access_token" ? { value: "bad" } : undefined,
      });
      mockFetch.mockResolvedValue({ ok: false, status: 401 });

      const result = await validateOTP(
        { ok: false, success: null, error: {} },
        formData,
      );

      expect(result.ok).toBe(false);
      expect(result.error.form.errors).toContain(
        "Sessão encerrada. Você precisa fazer o login",
      );
    });

    it("returns invalid code for 404/409/410", async () => {
      const formData = new FormData();
      formData.set("code", "123456");
      mockCookies.mockResolvedValue({
        get: () => ({ value: "token" }),
      });
      mockFetch.mockResolvedValue({ ok: false, status: 404 });

      const result = await validateOTP(
        { ok: false, success: null, error: {} },
        formData,
      );

      expect(result.ok).toBe(false);
      expect(result.error.form.errors).toContain("Código inválido ou expirado");
    });

    it("returns generic error for other status codes", async () => {
      const formData = new FormData();
      formData.set("code", "123456");
      mockCookies.mockResolvedValue({ get: () => ({ value: "token" }) });
      mockFetch.mockResolvedValue({ ok: false, status: 500 });

      const result = await validateOTP(
        { ok: false, success: null, error: {} },
        formData,
      );

      expect(result.ok).toBe(false);
      expect(result.error.form.errors).toContain(
        "Ocorreu um erro inesperado no servidor",
      );
    });

    it("when 401 and refresh returns ok but no set-cookie, does not retry validation", async () => {
      const formData = new FormData();
      formData.set("code", "123456");
      mockCookies.mockResolvedValue({
        get: (name: string) =>
          name === "access_token"
            ? { value: "expired" }
            : name === "refresh_token"
              ? { value: "refresh" }
              : undefined,
      });
      mockFetch
        .mockResolvedValueOnce({ ok: false, status: 401 })
        .mockResolvedValueOnce({ ok: true, headers: new Headers({}) });

      const result = await validateOTP(
        { ok: false, success: null, error: {} },
        formData,
      );

      expect(result.ok).toBe(false);
      expect(result.error.form.errors).toContain(
        "Sessão encerrada. Você precisa fazer o login",
      );
    });

    it("when 401 and refresh returns set-cookie without access_token, keeps 401 error", async () => {
      const formData = new FormData();
      formData.set("code", "123456");
      mockCookies.mockResolvedValue({
        get: (name: string) =>
          name === "access_token"
            ? { value: "expired" }
            : name === "refresh_token"
              ? { value: "refresh" }
              : undefined,
      });
      mockFetch
        .mockResolvedValueOnce({ ok: false, status: 401 })
        .mockResolvedValueOnce({
          ok: true,
          headers: new Headers({
            "set-cookie": "refresh_token=rr; Path=/; HttpOnly",
          }),
        });

      const result = await validateOTP(
        { ok: false, success: null, error: {} },
        formData,
      );

      expect(result.ok).toBe(false);
    });

    it("when no access_token but has refresh_token and refresh fails", async () => {
      const formData = new FormData();
      formData.set("code", "123456");
      mockCookies.mockResolvedValue({
        get: (name: string) =>
          name === "access_token"
            ? undefined
            : name === "refresh_token"
              ? { value: "refresh" }
              : undefined,
      });
      mockFetch
        .mockResolvedValueOnce({ ok: false, status: 401 })
        .mockResolvedValueOnce({ ok: false, status: 401 });

      const result = await validateOTP(
        { ok: false, success: null, error: {} },
        formData,
      );

      expect(result.ok).toBe(false);
      expect(result.error.form.errors).toContain(
        "Sessão encerrada. Você precisa fazer o login",
      );
    });
  });
});
