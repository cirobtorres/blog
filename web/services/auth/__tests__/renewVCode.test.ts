/**
 * @jest-environment node
 */
import { renewVCode } from "../renewVCode";

const mockCookies = jest.fn();
const mockFetch = jest.fn();

jest.mock("next/headers", () => ({
  cookies: () => mockCookies(),
}));

(global as unknown as { fetch: typeof mockFetch }).fetch = mockFetch;

beforeEach(() => {
  mockCookies.mockReset();
  mockFetch.mockReset();
});

describe("renewVCode", () => {
  it("returns ok: true when backend returns 2xx", async () => {
    mockCookies.mockResolvedValue({
      get: (name: string) =>
        name === "access_token" ? { value: "token123" } : undefined,
    });
    mockFetch.mockResolvedValue({ ok: true });

    const result = await renewVCode();

    expect(result).toEqual({ ok: true, success: null, error: null });
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/auth/renew-code"),
      {
        method: "POST",
        headers: {
          Authorization: "Bearer token123",
          "Content-Type": "application/json",
        },
      },
    );
  });

  it("returns ok: true when response.ok is true", async () => {
    mockCookies.mockResolvedValue({
      get: (name: string) =>
        name === "access_token" ? { value: "t" } : undefined,
    });
    mockFetch.mockResolvedValue({ ok: true });

    const result = await renewVCode();

    expect(result.ok).toBe(true);
    expect(result.success).toBeNull();
    expect(result.error).toBeNull();
  });

  it("returns ok: false when response is not ok", async () => {
    mockCookies.mockResolvedValue({
      get: (name: string) =>
        name === "access_token" ? { value: "t" } : undefined,
    });
    mockFetch.mockResolvedValue({ ok: false });

    const result = await renewVCode();

    expect(result).toEqual({ ok: false, success: null, error: null });
  });

  it("returns ok: false when access_token cookie is missing", async () => {
    mockCookies.mockResolvedValue({ get: () => undefined });

    const result = await renewVCode();

    expect(result).toEqual({ ok: false, success: null, error: null });
    expect(mockFetch).not.toHaveBeenCalled();
  });
});
