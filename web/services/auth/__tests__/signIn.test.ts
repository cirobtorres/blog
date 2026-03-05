/**
 * @jest-environment node
 */
import { signIn } from "../signIn";

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
    (err as unknown as { digest: string }).digest = "NEXT_REDIRECT;" + url;
    throw err;
  },
}));

(global as unknown as { fetch: typeof mockFetch }).fetch = mockFetch;

const originalNodeEnv = process.env.NODE_ENV;

beforeEach(() => {
  mockCookies.mockReset();
  mockRedirect.mockReset();
  mockFetch.mockReset();
  process.env = { ...process.env, NODE_ENV: "test" };
});

afterAll(() => {
  process.env = { ...process.env, NODE_ENV: originalNodeEnv };
});

describe("signIn", () => {
  describe("input validation", () => {
    it("returns error when email is missing", async () => {
      const formData = new FormData();
      formData.set("password", "password123");

      const result = await signIn(
        { ok: false, success: null, error: {} as SignInActionState["error"] },
        formData,
      );

      expect(result.ok).toBe(false);
      expect(result.error.email.errors).toContain("Email é obrigatório");
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it("returns error when password is missing", async () => {
      const formData = new FormData();
      formData.set("email", "user@example.com");

      const result = await signIn(
        { ok: false, success: null, error: {} as SignInActionState["error"] },
        formData,
      );

      expect(result.ok).toBe(false);
      expect(result.error.password.errors).toContain("Senha é obrigatória");
    });

    it("returns error when both email and password are missing", async () => {
      const formData = new FormData();

      const result = await signIn(
        { ok: false, success: null, error: {} as SignInActionState["error"] },
        formData,
      );

      expect(result.ok).toBe(false);
      expect(result.error.email.errors).toContain("Email é obrigatório");
      expect(result.error.password.errors).toContain("Senha é obrigatória");
    });
  });

  describe("API response", () => {
    it.each([400, 401, 404, 409])(
      "on %s returns email/password error",
      async (status) => {
        const formData = new FormData();
        formData.set("email", "user@example.com");
        formData.set("password", "wrong");
        mockFetch.mockResolvedValueOnce({ ok: false, status });

        const result = await signIn(
          {
            ok: false,
            success: null,
            error: {} as SignInActionState["error"],
          },
          formData,
        );

        expect(result.ok).toBe(false);
        expect(result.error.email.errors).toContain("Email ou senha não existem");
        expect(result.error.password.errors).toContain(
          "Email ou senha não existem",
        );
      },
    );

    it("on success with unverified email redirects to validate-email", async () => {
      const formData = new FormData();
      formData.set("email", "user@example.com");
      formData.set("password", "password");
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          headers: new Headers({
            "set-cookie":
              "access_token=at; Path=/; HttpOnly; Max-Age=3600, refresh_token=rt; Path=/",
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () =>
            Promise.resolve({
              id: "1",
              name: "User",
              email: "user@example.com",
              isProviderEmailVerified: false,
              authorities: ["USER"],
            }),
        });
      const cookieSet = jest.fn();
      mockCookies.mockResolvedValue({ set: cookieSet });

      await expect(
        signIn(
          { ok: false, success: null, error: {} as SignInActionState["error"] },
          formData,
        ),
      ).rejects.toThrow("NEXT_REDIRECT");
      expect(mockRedirect).toHaveBeenCalledWith("/sign-up/validate-email");
    });

    it("on success with verified email redirects to home", async () => {
      const formData = new FormData();
      formData.set("email", "user@example.com");
      formData.set("password", "password");
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          headers: new Headers({
            "set-cookie": "access_token=at; Path=/; HttpOnly",
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () =>
            Promise.resolve({
              id: "1",
              name: "User",
              email: "user@example.com",
              isProviderEmailVerified: true,
              authorities: ["USER"],
            }),
        });
      mockCookies.mockResolvedValue({ set: jest.fn() });

      await expect(
        signIn(
          { ok: false, success: null, error: {} as SignInActionState["error"] },
          formData,
        ),
      ).rejects.toThrow("NEXT_REDIRECT");
      expect(mockRedirect).toHaveBeenCalledWith("/");
    });

    it("on non-400/401/404/409 error returns form error", async () => {
      const formData = new FormData();
      formData.set("email", "user@example.com");
      formData.set("password", "pass");
      mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });

      const result = await signIn(
        { ok: false, success: null, error: {} as SignInActionState["error"] },
        formData,
      );

      expect(result.ok).toBe(false);
      expect(result.error.form.errors).toContain("Erro de autenticação.");
    });
  });
});
