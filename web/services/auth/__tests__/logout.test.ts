/**
 * @jest-environment node
 */
import { logout } from "../logout";

const mockFetch = jest.fn();

beforeEach(() => {
  mockFetch.mockReset();
  (global as unknown as { fetch: typeof mockFetch }).fetch = mockFetch;
});

describe("logout", () => {
  it("calls fetch with logout URL, POST, and credentials include", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });

    await logout();

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/auth/logout"),
      { method: "POST", credentials: "include" },
    );
  });

  it("rejects when fetch throws (no try/catch in logout)", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    await expect(logout()).rejects.toThrow("Network error");
  });
});
