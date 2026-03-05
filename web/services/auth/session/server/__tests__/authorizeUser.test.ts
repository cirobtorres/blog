/**
 * @jest-environment node
 */
import { getSessionUser } from "../authorizeUser";

const mockGetUser = jest.fn();
jest.mock("../getUser", () => ({
  getUser: () => mockGetUser(),
}));

beforeEach(() => {
  mockGetUser.mockReset();
});

describe("getSessionUser (authorizeUser)", () => {
  const validUser: User = {
    id: "1",
    name: "Test",
    email: "test@example.com",
    isProviderEmailVerified: true,
    authorities: ["USER", "ADMIN"],
  };

  it("returns authorized true and user when session ok and no required role", async () => {
    mockGetUser.mockResolvedValue({ ok: true, data: validUser });

    const result = await getSessionUser();

    expect(result).toEqual({
      authorized: true,
      redirect: null,
      user: validUser,
    });
  });

  it("returns authorized true when user has required role", async () => {
    mockGetUser.mockResolvedValue({ ok: true, data: validUser });

    const result = await getSessionUser("ADMIN");

    expect(result).toEqual({
      authorized: true,
      redirect: null,
      user: validUser,
    });
  });

  it("returns authorized false and redirect /sign-in when session not ok", async () => {
    mockGetUser.mockResolvedValue({ ok: false, data: null });

    const result = await getSessionUser();

    expect(result).toEqual({
      authorized: false,
      redirect: "/sign-in",
      user: null,
    });
  });

  it("returns authorized false when session data is null", async () => {
    mockGetUser.mockResolvedValue({ ok: false, data: null });

    const result = await getSessionUser();

    expect(result.authorized).toBe(false);
    expect(result.redirect).toBe("/sign-in");
    expect(result.user).toBeNull();
  });

  it("returns authorized false and redirect / when user lacks required role", async () => {
    mockGetUser.mockResolvedValue({ ok: true, data: validUser });

    const result = await getSessionUser("SUPERADMIN");

    expect(result).toEqual({
      authorized: false,
      redirect: "/",
      user: null,
    });
  });

  it("returns authorized true when required role is USER and user has USER", async () => {
    mockGetUser.mockResolvedValue({ ok: true, data: validUser });

    const result = await getSessionUser("USER");

    expect(result.authorized).toBe(true);
    expect(result.user).toEqual(validUser);
  });
});
