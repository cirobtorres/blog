import { NextResponse } from "next/server";
import {
  parseSetCookie,
  decodeJwt,
  extractTokenFromHeader,
  applySpringCookies,
  extractPayload,
} from "../index";

describe("serve-actions", () => {
  describe("parseSetCookie", () => {
    it("splits multiple cookies by comma not inside semicolon attributes", () => {
      const header =
        "access_token=abc; Path=/; HttpOnly, refresh_token=xyz; Path=/; Max-Age=3600";
      expect(parseSetCookie(header)).toEqual([
        "access_token=abc; Path=/; HttpOnly",
        " refresh_token=xyz; Path=/; Max-Age=3600",
      ]);
    });

    it("returns single cookie as single-element array", () => {
      expect(parseSetCookie("foo=bar")).toEqual(["foo=bar"]);
    });

    it("handles empty string", () => {
      expect(parseSetCookie("")).toEqual([""]);
    });

    it("does not split on commas inside date values (e.g. Expires)", () => {
      const header = "session=id; Expires=Sun, 15-Jun-2025 12:00:00 GMT";
      const result = parseSetCookie(header);
      expect(result).toHaveLength(1);
      expect(result[0]).toContain("Sun, 15-Jun-2025");
    });
  });

  describe("decodeJwt", () => {
    it("decodes JWT payload from base64 middle segment", () => {
      const payload = { sub: "user-1", exp: 12345 };
      const token = `header.${btoa(JSON.stringify(payload))}.sig`;
      expect(decodeJwt(token)).toEqual(payload);
    });

    it("throws for invalid JSON in payload", () => {
      const token = `header.${btoa("not-json")}.sig`;
      expect(() => decodeJwt(token)).toThrow();
    });

    it("throws for malformed token without three segments", () => {
      expect(() => decodeJwt("only-two")).toThrow();
    });
  });

  describe("extractTokenFromHeader", () => {
    it("extracts value of named cookie from set-cookie header", () => {
      const header =
        "access_token=Bearer_abc; Path=/, refresh_token=xyz; Path=/";
      expect(extractTokenFromHeader(header, "access_token")).toBe("Bearer_abc");
      expect(extractTokenFromHeader(header, "refresh_token")).toBe("xyz");
    });

    it("returns null when cookie name not found", () => {
      const header = "other=value; Path=/";
      expect(extractTokenFromHeader(header, "access_token")).toBeNull();
    });

    it("returns null for empty header", () => {
      expect(extractTokenFromHeader("", "access_token")).toBeNull();
    });

    it("handles single cookie", () => {
      expect(extractTokenFromHeader("name=value; Path=/", "name")).toBe(
        "value",
      );
    });
  });

  describe("applySpringCookies", () => {
    const mockSet = jest.fn();

    beforeEach(() => {
      mockSet.mockClear();
      (process.env as Record<string, string | undefined>).NODE_ENV =
        "development";
    });

    it("sets each cookie on response with correct options in development", () => {
      const response = { cookies: { set: mockSet } } as unknown as NextResponse;
      const header = "access_token=abc; Path=/, refresh_token=def; Path=/";
      applySpringCookies(response, header);
      expect(mockSet).toHaveBeenCalledTimes(2);
      expect(mockSet).toHaveBeenCalledWith("access_token", "abc", {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "lax",
      });
    });

    it("uses secure and strict sameSite in production", () => {
      (process.env as Record<string, string | undefined>).NODE_ENV =
        "production";
      const response = { cookies: { set: mockSet } } as unknown as NextResponse;
      applySpringCookies(response, "token=val; Path=/");
      expect(mockSet).toHaveBeenCalledWith("token", "val", {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "strict",
      });
    });
  });

  describe("extractPayload", () => {
    it("returns parsed payload from JWT access token", () => {
      const payload: AuthTokensPayload = {
        iss: "app",
        sub: "user-1",
        exp: 999,
        iat: 0,
        type: "access",
        authorities: ["USER"],
      };
      const token = `header.${btoa(JSON.stringify(payload))}.sig`;
      expect(extractPayload(token)).toEqual(payload);
    });

    it("throws for invalid JSON in payload", () => {
      const bad = `a.${Buffer.from("not json").toString("base64")}.c`;
      expect(() => extractPayload(bad)).toThrow();
    });

    it("throws for malformed token (invalid base64 segment)", () => {
      expect(() => extractPayload("a.!!!.c")).toThrow();
    });
  });
});
