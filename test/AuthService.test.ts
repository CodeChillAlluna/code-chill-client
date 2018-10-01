import AuthService from "../src/AuthService";
import { LocalStorageMock } from "./LocalStorageMock";


test("testing loggedIn", () => {
  var auth = new AuthService();
  (global as any).localStorage  = new LocalStorageMock(jest);

  expect(auth.loggedIn()).toBe(false);
});

test("testing _checkStatus", () => {
  var auth = new AuthService();
  (global as any).localStorage  = new LocalStorageMock(jest);

  let response_success: any = { status: 200 };
  expect(auth._checkStatus(response_success)).toBe(response_success);

  let response_echec: any = { status: 400, statusText: "failed" };
  expect(() => {
    auth._checkStatus(response_echec)
  }).toThrow();
});

test("testing getToken toto", () => {
  var auth = new AuthService();
  (global as any).localStorage  = new LocalStorageMock(jest);

  expect(auth.getToken()).toBeNull();
  auth.setToken("toto");
  expect(auth.getToken()).toEqual("toto");
});
