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
  fetchMock.once("http://toto/auth", { status: 200, body: { token: tokenAvailable } }, { method: "POST" });

  auth.login("Bob", "Sponge").then(function(data: any) {
    expect(data.status).toEqual(200);
    expect(data.statusText).toEqual("OK");
    expect(data.content.token).toEqual(tokenAvailable);
  }).catch((err) => {
    console.log(err);
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
  fetchMock.once("http://toto/user", { status: 200, body: { } }, { method: "GET" });
  auth.getUserInfos().then(function(data: any) {
    let content = {
      message: "REST API doesn't return any message"
    };

    expect(data.status).toEqual(200);
    expect(data.statusText).toEqual("OK");
    expect(data.content).toEqual(content);
  }).catch((err) => {
    console.log(err);
  });
});

test("testing editUser", () => {
  let auth = new AuthService();
  fetchMock.once("http://toto/user", { status: 200, body: { } }, { method: "PUT" });
  auth.editUser({ id: 0, username: "toto" }).then(function(data: any) {
    let content = {
      message: "REST API doesn't return any message"
    };

    expect(data.status).toEqual(200);
    expect(data.statusText).toEqual("OK");
    expect(data.content).toEqual(content);
  }).catch((err) => {
    console.log(err);
  });
});

test("testing deleteUser", () => {
  let auth = new AuthService();
  fetchMock.once("http://toto/user", { status: 200, body: { } }, { method: "DELETE" });
  auth.deleteUser().then(function(data: any) {
    let content = {
      message: "REST API doesn't return any message"
    };

    expect(data.status).toEqual(200);
    expect(data.statusText).toEqual("OK");
    expect(data.content).toEqual(content);
  }).catch((err) => {
    console.log(err);
  });
});

test("testing createAccount", () => {
  let auth = new AuthService();
  fetchMock.once("http://toto/user", { status: 200, body: { } }, { method: "POST" });
  auth.createAccount({ id: 0, username: "toto"}).then(function(data: any) {
    let content = {
      message: "REST API doesn't return any message"
    };

    expect(data.status).toEqual(200);
    expect(data.statusText).toEqual("OK");
    expect(data.content).toEqual(content);
  }).catch((err) => {
    console.log(err);
  });
});

test("testing forgotPassword", () => {
  let auth = new AuthService();
  fetchMock.once("http://toto/user/forgottenpassword", { status: 200, body: { } }, { method: "POST" });
  auth.forgotPassword("bob@sponge.wa").then(function(data: any) {
    let content = {
      message: "REST API doesn't return any message"
    };

    expect(data.status).toEqual(200);
    expect(data.statusText).toEqual("OK");
    expect(data.content).toEqual(content);
  }).catch((err) => {
    console.log(err);
  });
});

test("testing checkTokenPassword", () => {
  let auth = new AuthService();
  fetchMock.once(`http://toto/reset/${token}`, { status: 200, body: { } }, { method: "GET" });
  auth.checkTokenPassword(token as string).then(function(data: any) {
    let content = {
      message: "REST API doesn't return any message"
    };

    expect(data.status).toEqual(200);
    expect(data.statusText).toEqual("OK");
    expect(data.content).toEqual(content);
  }).catch((err) => {
    console.log(err);
  });
});

test("testing resetPassword", () => {
  let auth = new AuthService();
  fetchMock.once("http://toto/reset", { status: 200, body: { } }, { method: "POST" });
  auth.resetPassword(token as string, "toto").then(function(data: any) {
    let content = {
      message: "REST API doesn't return any message"
    };

    expect(data.status).toEqual(200);
    expect(data.statusText).toEqual("OK");
    expect(data.content).toEqual(content);
  }).catch((err) => {
    console.log(err);
  });
});

test("testing createDocker", () => {
  let auth = new AuthService();
  fetchMock.once("http://toto/containers/create", { status: 200, body: { } }, { method: "POST" });
  auth.createDocker().then(function(data: any) {
    let message = "Docker created.";

    expect(data.status).toEqual(200);
    expect(data.statusText).toEqual("OK");
    expect(data.content.message).toEqual(message);
  }).catch((err) => {
    console.log(err);
  });
  fetchMock.restore();
  fetchMock.once("http://toto/containers/create", { status: 304, body: { } }, { method: "POST" });
  auth.createDocker().then(function(data: any) {
    let message = "Cannot create a new docker.";

    expect(data.status).toEqual(304);
    expect(data.statusText).toEqual("Not Modified");
    expect(data.content.message).toEqual(message);
  }).catch((err) => {
    console.log(err);
  });
});

test("testing deleteDocker", () => {
  let auth = new AuthService();
  fetchMock.once("http://toto/containers/0", { status: 204, body: { } }, { method: "DELETE" });
  auth.deleteDocker(0).then(function(data: any) {
    let message = "Docker deleted.";
    expect(data.status).toEqual(204);
    expect(data.statusText).toEqual("No Content");
    expect(data.content.message).toEqual(message);
  }).catch((err) => {
    console.log(err);
  });
  fetchMock.restore();
  fetchMock.once("http://toto/containers/0", { status: 304, body: { } }, { method: "DELETE" });
  auth.deleteDocker(0).then(function(data: any) {
    let message = "Docker needs to be off to be deleted.";
    expect(data.status).toEqual(304);
    expect(data.statusText).toEqual("Not Modified");
    expect(data.content.message).toEqual(message);
  }).catch((err) => {
    console.log(err);
  });
});

test("testing startDocker", () => {
  let auth = new AuthService();
  fetchMock.once("http://toto/containers/0/start", { status: 204, body: { } }, { method: "POST" });
  auth.startDocker(0).then(function(data: any) {
    let message = "Docker started.";
    expect(data.status).toEqual(204);
    expect(data.statusText).toEqual("No Content");
    expect(data.content.message).toEqual(message);
  }).catch((err) => {
    console.log(err);
  });
  fetchMock.restore();
  fetchMock.once("http://toto/containers/0/start", { status: 304, body: { } }, { method: "POST" });
  auth.startDocker(0).then(function(data: any) {
    let message = "Docker needs to be off to be started.";
    expect(data.status).toEqual(304);
    expect(data.statusText).toEqual("Not Modified");
    expect(data.content.message).toEqual(message);
  }).catch((err) => {
    console.log(err);
  });
});

test("testing stopDocker", () => {
  let auth = new AuthService();
  fetchMock.once("http://toto/containers/0/stop", { status: 204, body: { } }, { method: "POST" });
  auth.stopDocker(0).then(function(data: any) {
    let message = "Docker stopped.";
    expect(data.status).toEqual(204);
    expect(data.statusText).toEqual("No Content");
    expect(data.content.message).toEqual(message);
  }).catch((err) => {
    console.log(err);
  });
  fetchMock.restore();
  fetchMock.once("http://toto/containers/0/stop", { status: 304, body: { } }, { method: "POST" });
  auth.stopDocker(0).then(function(data: any) {
    let message = "Docker needs to be running to be stopped.";
    expect(data.status).toEqual(304);
    expect(data.statusText).toEqual("Not Modified");
    expect(data.content.message).toEqual(message);
  }).catch((err) => {
    console.log(err);
  });
});

test("testing pauseDocker", () => {
  let auth = new AuthService();
  fetchMock.once("http://toto/containers/0/pause", { status: 204, body: { } }, { method: "POST" });
  auth.pauseDocker(0).then(function(data: any) {
    let message = "Docker paused.";
    expect(data.status).toEqual(204);
    expect(data.statusText).toEqual("No Content");
    expect(data.content.message).toEqual(message);
  }).catch((err) => {
    console.log(err);
  });
  fetchMock.restore();
  fetchMock.once("http://toto/containers/0/pause", { status: 304, body: { } }, { method: "POST" });
  auth.pauseDocker(0).then(function(data: any) {
    let message = "Docker needs to be running to be paused.";
    expect(data.status).toEqual(304);
    expect(data.statusText).toEqual("Not Modified");
    expect(data.content.message).toEqual(message);
  }).catch((err) => {
    console.log(err);
  });
});

test("testing resumeDocker", () => {
  let auth = new AuthService();
  fetchMock.once("http://toto/containers/0/resume", { status: 204, body: { } }, { method: "POST" });
  auth.resumeDocker(0).then(function(data: any) {
    let message = "Docker resumed.";
    expect(data.status).toEqual(204);
    expect(data.statusText).toEqual("No Content");
    expect(data.content.message).toEqual(message);
  }).catch((err) => {
    console.log(err);
  });
  fetchMock.restore();
  fetchMock.once("http://toto/containers/0/resume", { status: 304, body: { } }, { method: "POST" });
  auth.resumeDocker(0).then(function(data: any) {
    let message = "Docker needs to be on pause to be resumed.";
    expect(data.status).toEqual(304);
    expect(data.statusText).toEqual("Not Modified");
    expect(data.content.message).toEqual(message);
  }).catch((err) => {
    console.log(err);
  });
});

test("testing statsDocker", () => {
  let auth = new AuthService();
  fetchMock.once("http://toto/containers/0/stats", { status: 204, body: { } }, { method: "GET" });
  auth.statsDocker(0).then(function(data: any) {
    expect(data.status).toEqual(204);
    expect(data.statusText).toEqual("No Content");
  }).catch((err) => {
    console.log(err);
  });
});

/** TODO:
 * setToken
 * parseResponse
 * fetch
 */