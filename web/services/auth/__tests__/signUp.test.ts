/**
 * @jest-environment node
 */
import { publicWebUrls } from "../../../config/routes";
import { signUp } from "../signUp";

const mockCookies = jest.fn();
const mockRedirect = jest.fn();
const mockFetch = jest.fn();

jest.mock("next/headers", () => ({
  cookies: () => mockCookies(),
}));
jest.mock("next/navigation", () => ({
  redirect: (url: string) => {
    mockRedirect(url);
    const err = new Error("NEXT_REDIRECT");
    (err as unknown as { digest: string }).digest = "NEXT_REDIRECT;/" + url;
    throw err;
  },
}));

(global as unknown as { fetch: typeof mockFetch }).fetch = mockFetch;

beforeEach(() => {
  mockCookies.mockReset();
  mockRedirect.mockReset();
  mockFetch.mockReset();
  process.env = { ...process.env, NODE_ENV: "test" };
});

describe("signUp", () => {
  describe("validation", () => {
    it("returns error when name is too short", async () => {
      const formData = new FormData();
      formData.set("name", "ab");
      formData.set("email", "user@example.com");
      formData.set("password", "password123");
      formData.set("strength", "4");

      const result = await signUp(
        { ok: false, success: null, error: {} },
        formData,
      );

      expect(result.ok).toBe(false);
      expect(result.error).toBeDefined();
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it("returns error when email is invalid", async () => {
      const formData = new FormData();
      formData.set("name", "John Doe");
      formData.set("email", "not-an-email");
      formData.set("password", "password123");
      formData.set("strength", "4");

      const result = await signUp(
        { ok: false, success: null, error: {} },
        formData,
      );

      expect(result.ok).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("returns error when password is too short", async () => {
      const formData = new FormData();
      formData.set("name", "John Doe");
      formData.set("email", "user@example.com");
      formData.set("password", "short");
      formData.set("strength", "4");

      const result = await signUp(
        { ok: false, success: null, error: {} },
        formData,
      );

      expect(result.ok).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("returns error when strength is too low", async () => {
      const formData = new FormData();
      formData.set("name", "John Doe");
      formData.set("email", "user@example.com");
      formData.set("password", "password123");
      formData.set("strength", "2");

      const result = await signUp(
        { ok: false, success: null, error: {} },
        formData,
      );

      expect(result.ok).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe("API response", () => {
    it("on success sets cookies and redirects to validate-email", async () => {
      const formData = new FormData();
      formData.set("name", "John Doe");
      formData.set("email", "user@example.com");
      formData.set("password", "password123");
      formData.set("strength", "4");
      formData.set("termsCheckbox", "true");

      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({
          "set-cookie":
            "access_token=at; Path=/; HttpOnly; Max-Age=3600, refresh_token=rt; Path=/; HttpOnly",
        }),
      });
      const cookieStoreSet = jest.fn();
      mockCookies.mockResolvedValue({ set: cookieStoreSet });

      await expect(
        signUp({ ok: false, success: null, error: {} }, formData),
      ).rejects.toThrow("NEXT_REDIRECT");
      expect(mockRedirect).toHaveBeenCalledWith(publicWebUrls.validateEmail);
      expect(cookieStoreSet).toHaveBeenCalled();
    });

    it("on success with no set-cookie header still redirects", async () => {
      const formData = new FormData();
      formData.set("name", "John Doe");
      formData.set("email", "user@example.com");
      formData.set("password", "password123");
      formData.set("strength", "4");
      formData.set("termsCheckbox", "true");

      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({}),
      });
      mockCookies.mockResolvedValue({ set: jest.fn() });

      await expect(
        signUp({ ok: false, success: null, error: {} }, formData),
      ).rejects.toThrow("NEXT_REDIRECT");
    });

    it("returns conflict error when status is 409", async () => {
      const formData = new FormData();
      formData.set("name", "John Doe");
      formData.set("email", "existing@example.com");
      formData.set("password", "password123");
      formData.set("strength", "4");
      formData.set("termsCheckbox", "true");

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 409,
        json: () => Promise.resolve({ message: "Email already in use" }),
      });

      const result = await signUp(
        { ok: false, success: null, error: {} },
        formData,
      );

      expect(result.ok).toBe(false);
      expect(result.error).toHaveProperty("email");
    });

    it("returns conflict error when status is 409 without message (uses default)", async () => {
      const formData = new FormData();
      formData.set("name", "John Doe");
      formData.set("email", "existing@example.com");
      formData.set("password", "password123");
      formData.set("strength", "4");
      formData.set("termsCheckbox", "true");

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 409,
        json: () => Promise.resolve({}),
      });

      const result = await signUp(
        { ok: false, success: null, error: {} },
        formData,
      );

      expect(result.ok).toBe(false);
      expect(result.error.email.errors).toContain("Este e-mail já está em uso");
    });

    it("returns form error when status is 400", async () => {
      const formData = new FormData();
      formData.set("name", "John Doe");
      formData.set("email", "user@example.com");
      formData.set("password", "password123");
      formData.set("strength", "4");
      formData.set("termsCheckbox", "true");

      mockFetch.mockResolvedValueOnce({ ok: false, status: 400 });

      const result = await signUp(
        { ok: false, success: null, error: {} },
        formData,
      );

      expect(result.ok).toBe(false);
      expect(result.error).toHaveProperty("form");
    });

    it("returns generic form error for 401/500 etc", async () => {
      const formData = new FormData();
      formData.set("name", "John Doe");
      formData.set("email", "user@example.com");
      formData.set("password", "password123");
      formData.set("strength", "4");
      formData.set("termsCheckbox", "true");

      mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });

      const result = await signUp(
        { ok: false, success: null, error: {} },
        formData,
      );

      expect(result.ok).toBe(false);
      expect(result.error.form.errors).toContain(
        "Ocorreu um erro inesperado no servidor.",
      );
    });
  });

  describe("edge cases", () => {
    it("returns connection error on fetch rejection", async () => {
      const formData = new FormData();
      formData.set("name", "John Doe");
      formData.set("email", "user@example.com");
      formData.set("password", "password123");
      formData.set("strength", "4");
      formData.set("termsCheckbox", "true");

      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const result = await signUp(
        { ok: false, success: null, error: {} },
        formData,
      );

      expect(result.ok).toBe(false);
      expect(result.error.form.errors).toContain(
        "Falha na conexão com o servidor",
      );
    });
  });
});
