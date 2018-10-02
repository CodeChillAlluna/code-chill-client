import AuthService from "../src/AuthService";
import { LocalStorageMock } from "./LocalStorageMock";
import * as jwtDecode from "jwt-decode";

test("testing loggedIn", () => {
  var auth = new AuthService();
  (global as any).localStorage  = new LocalStorageMock(jest);

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

  expect(auth.getToken()).toBeNull();

  auth.setToken("toto");
  expect(auth.getToken()).toEqual("toto");

  auth.logout();
  expect(auth.getToken()).toBeNull();
});

test("testing getProfile", () => {
  var auth = new AuthService();
  (global as any).localStorage  = new LocalStorageMock(jest);

  let token: String = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWI"
  + "iOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE"
  + "2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  auth.setToken(token);
  expect(auth.getProfile()).toEqual(jwtDecode(token));
});