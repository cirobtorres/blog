/**
 * @jest-environment node
 */
import getUser from "../getUser";

const mockFetch = jest.fn();

beforeEach(() => {
  mockFetch.mockReset();
  (global as unknown as { fetch: typeof mockFetch }).fetch = mockFetch;
  process.env = { ...process.env, NODE_ENV: "test" };
});

describe("getUser (client)", () => {
  it("returns ok: true and user data when response is ok", async () => {
    const user = {
      id: "1",
      name: "Test",
      email: "test@example.com",
      isProviderEmailVerified: true,
      authorities: ["USER"],
    };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(user),
    });

    const result = await getUser();

    expect(result).toEqual({ ok: true, data: user });
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/users/me"),
      { method: "GET", credentials: "include" },
    );
  });

  it("returns ok: false when response status is 204", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 204 });

    const result = await getUser();

    expect(result).toEqual({ ok: false, data: null });
  });

  it("returns ok: false when response status is 401", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 401 });

    const result = await getUser();

    expect(result).toEqual({ ok: false, data: null });
  });

  it("returns ok: false when response status is 404", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 404 });

    const result = await getUser();

    expect(result).toEqual({ ok: false, data: null });
  });

  it("returns ok: false when response not ok and status is not 204/401/404 (error caught)", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    const result = await getUser();
    expect(result).toEqual({ ok: false, data: null });
  });

  it("returns ok: false on fetch rejection (network error)", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const result = await getUser();

    expect(result).toEqual({ ok: false, data: null });
  });
});
