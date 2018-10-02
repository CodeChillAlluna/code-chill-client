import AuthService from "../src/AuthService";
import { LocalStorageMock } from "./LocalStorageMock";
import * as jwtDecode from "jwt-decode";

const token: String = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWI"
  + "iOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE"
  + "2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

const expiredToken: String = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e"
  + "yJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2"
  + "MjM5MDIyLCJleHAiOjF9.2H0EJnt58ApysedXcvNUAy6FhgBIbDmPfq9d79qF4yQ";

const tokenAvailable: String = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e"
+ "yJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2M"
+ "jM5MDIyLCJleHAiOjFlKzMxfQ.yU5y9eCA5Z1VXrwbrRHoiqpMa5oii_5vApdg-dDDgIE";

test("testing loggedIn", () => {
  var auth = new AuthService();
  (global as any).localStorage  = new LocalStorageMock(jest);

  expect(auth.loggedIn()).toBe(false);

  auth.setToken(tokenAvailable);
  expect(auth.loggedIn()).toBe(true);

  auth.setToken(expiredToken);
  expect(auth.loggedIn()).toBe(false);
});

test("testing _checkStatus", () => {
  var auth = new AuthService();
  (global as any).localStorage  = new LocalStorageMock(jest);

  let responseSuccess: any = { status: 200 };
  expect(auth._checkStatus(responseSuccess)).toBe(responseSuccess);

  let responseEchec: any = { status: 400, statusText: "failed" };
  expect(() => {
    auth._checkStatus(responseEchec);
  }).toThrow();
});

test("testing getToken toto", () => {
  var auth = new AuthService();
  (global as any).localStorage  = new LocalStorageMock(jest);

  auth.setToken("toto");
  expect(auth.getToken()).toEqual("toto");

  auth.logout();
  expect(auth.getToken()).toBeNull();
});

test("testing getProfile", () => {
  var auth = new AuthService();
  (global as any).localStorage  = new LocalStorageMock(jest);

  auth.setToken(token);
  expect(auth.getProfile()).toEqual(jwtDecode(token));
});

test("testing isTokenExpired", () => {
  var auth = new AuthService();
  (global as any).localStorage  = new LocalStorageMock(jest);

  expect(auth.isTokenExpired(expiredToken)).toBe(true);
  expect(auth.isTokenExpired(tokenAvailable)).toBe(false);
  expect(auth.isTokenExpired("toto")).toBe(true);
  
});

test("testing logout", () => {
  var auth = new AuthService();
  (global as any).localStorage  = new LocalStorageMock(jest);

  auth.setToken(tokenAvailable);
  auth.logout();
  expect(auth.getToken()).toBeNull();
});