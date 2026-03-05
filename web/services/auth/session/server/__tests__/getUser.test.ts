/**
 * @jest-environment node
 */
import { getUser } from "../getUser";

const mockCookies = jest.fn();
const mockFetch = jest.fn();

jest.mock("next/headers", () => ({
  cookies: () => mockCookies(),
}));

(global as unknown as { fetch: typeof mockFetch }).fetch = mockFetch;

beforeEach(() => {
  mockCookies.mockReset();
  mockFetch.mockReset();
  process.env.NODE_ENV = "test";
});

describe("getUser (server)", () => {
  it("returns ok: true and user when API returns 200 with body", async () => {
    const user = {
      id: "1",
      name: "Test",
      email: "test@example.com",
      isProviderEmailVerified: true,
      authorities: ["USER"],
    };
    mockCookies.mockResolvedValue({
      get: (name: string) =>
        name === "access_token" ? { value: "token" } : undefined,
    });
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(user),
    });

    const result = await getUser();

    expect(result).toEqual({ ok: true, data: user });
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/users/me"),
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          Authorization: "Bearer token",
        }),
      }),
    );
  });

  it("returns ok: false when access_token cookie is missing", async () => {
    mockCookies.mockResolvedValue({ get: () => undefined });

    const result = await getUser();

    expect(result).toEqual({ ok: false, data: null });
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("returns ok: false when response status is 204", async () => {
    mockCookies.mockResolvedValue({
      get: () => ({ value: "token" }),
    });
    mockFetch.mockResolvedValue({ ok: false, status: 204 });

    const result = await getUser();

    expect(result).toEqual({ ok: false, data: null });
  });

  it("returns ok: false when response status is 401", async () => {
    mockCookies.mockResolvedValue({
      get: () => ({ value: "token" }),
    });
    mockFetch.mockResolvedValue({ ok: false, status: 401 });

    const result = await getUser();

    expect(result).toEqual({ ok: false, data: null });
  });

  it("returns ok: false when response status is 404", async () => {
    mockCookies.mockResolvedValue({
      get: () => ({ value: "token" }),
    });
    mockFetch.mockResolvedValue({ ok: false, status: 404 });

    const result = await getUser();

    expect(result).toEqual({ ok: false, data: null });
  });

  it("returns ok: false and catches when response not ok and status not 204/401/404", async () => {
    mockCookies.mockResolvedValue({
      get: () => ({ value: "token" }),
    });
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    const result = await getUser();

    expect(result).toEqual({ ok: false, data: null });
  });

  it("returns ok: false on fetch throw", async () => {
    mockCookies.mockResolvedValue({
      get: () => ({ value: "token" }),
    });
    mockFetch.mockRejectedValue(new Error("Network error"));

    const result = await getUser();

    expect(result).toEqual({ ok: false, data: null });
  });
});
