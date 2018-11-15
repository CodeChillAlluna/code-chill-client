import AuthService from "../src/AuthService";
import "jest-localstorage-mock";
import * as jwtDecode from "jwt-decode";
import * as FakeRest from "fakerest";
import * as fetchMock from "fetch-mock";

const token: String = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWI"
  + "iOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE"
  + "2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

const expiredToken: String = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e"
  + "yJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2"
  + "MjM5MDIyLCJleHAiOjF9.2H0EJnt58ApysedXcvNUAy6FhgBIbDmPfq9d79qF4yQ";

const tokenAvailable: String = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e"
+ "yJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2M"
+ "jM5MDIyLCJleHAiOjFlKzMxfQ.yU5y9eCA5Z1VXrwbrRHoiqpMa5oii_5vApdg-dDDgIE";

(<any> window).env = {
  restApi: "http://toto",
  dockerApi: "ws://localhost:2375"
};

test("testing loggedIn", () => {
  var auth = new AuthService();
  expect(auth.loggedIn()).toBe(false);

  auth.setToken(tokenAvailable);
  expect(auth.loggedIn()).toBe(true);

  auth.setToken(expiredToken);
  expect(auth.loggedIn()).toBe(false);
});

test("testing getToken toto", () => {
  var auth = new AuthService();
  auth.setToken("toto");
  expect(auth.getToken()).toEqual("toto");

  auth.logout();
  expect(auth.getToken()).toBeNull();
});

test("testing getProfile", () => {
  var auth = new AuthService();
  auth.setToken(token);
  expect(auth.getProfile()).toEqual(jwtDecode(token));
});

test("testing isTokenExpired", () => {
  var auth = new AuthService();
  expect(auth.isTokenExpired(expiredToken)).toBe(true);
  expect(auth.isTokenExpired(tokenAvailable)).toBe(false);
  expect(auth.isTokenExpired("toto")).toBe(true);
  
});

test("testing logout", () => {
  var auth = new AuthService();
  auth.setToken(tokenAvailable);
  auth.logout();
  expect(auth.getToken()).toBeNull();
});

test("testing get user infos", () => {
  var auth = new AuthService();
  auth.setToken(tokenAvailable);
  var restServer = new FakeRest.FetchServer("http://toto");
  restServer.init({
    "user": [
        { id: 0, username: "Bobsponge", firstname: "Bob", lastname: "sponge", email: "bob@sponge.wa" }
    ]
  });
  fetchMock.mock("http://toto", restServer.getHandler());
  try {
    auth.getUserInfos().then((res) => console.log(res)).catch((err) => console.log(err));
  } catch(e) {
    console.log(e);
  }
});