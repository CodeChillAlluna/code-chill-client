import AuthService from "../src/AuthService";
import "jest-localstorage-mock";
import * as jwtDecode from "jwt-decode";
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
  restApi: "http://toto"
};

test("testing login", () => {
  let auth = new AuthService();
  fetchMock.once("http://toto/auth", { token: tokenAvailable }, { method: "POST" });

  auth.login("Bob", "Sponge").then(function(data: any) {
    expect(data.status).toEqual(200);
    expect(data.statusText).toEqual("OK");
    expect(data.content.token).toEqual(tokenAvailable);
  });
});

test("testing loggedIn", () => {
  let auth = new AuthService();
  auth.setToken(null);
  expect(auth.loggedIn()).toBe(false);

  auth.setToken(tokenAvailable);
  expect(auth.loggedIn()).toBe(true);

  auth.setToken(expiredToken);
  expect(auth.loggedIn()).toBe(false);
});

test("testing isTokenExpired", () => {
  let auth = new AuthService();
  expect(auth.isTokenExpired(expiredToken)).toBe(true);
  expect(auth.isTokenExpired(tokenAvailable)).toBe(false);
  expect(auth.isTokenExpired("toto")).toBe(true);
  
});

test("testing getToken", () => {
  let auth = new AuthService();
  auth.setToken("toto");
  expect(auth.getToken()).toEqual("toto");

  auth.logout();
  expect(auth.getToken()).toBeNull();
});

test("testing logout", () => {
  let auth = new AuthService();
  auth.setToken(tokenAvailable);
  auth.logout();
  expect(auth.getToken()).toBeNull();
});

test("testing getProfile", () => {
  let auth = new AuthService();
  auth.setToken(token);
  expect(auth.getProfile()).toEqual(jwtDecode(token));
});

test("testing getUserInfos", () => {
  let auth = new AuthService();
  auth.setToken(tokenAvailable);
  fetchMock.once("http://toto/user", { hello: "world" }, { method: "GET" });
  auth.getUserInfos().then(function(data: any) {
    let content = {
      hello: "world",
      message: "REST API doesn't return any message"
    };

    expect(data.status).toEqual(200);
    expect(data.statusText).toEqual("OK");
    expect(data.content).toEqual(content);
  });
});

/** TODO:
 * setToken
 * editUser
 * deleteUser
 * createAccount
 * forgotPassword
 * checkTokenPassword
 * resetPassword
 * createDocker
 * deleteDocker
 * startDocker
 * stopDocker
 * pauseDocker
 * resumeDocker
 * statsDocker
 * parseResponse
 * fetch
 */