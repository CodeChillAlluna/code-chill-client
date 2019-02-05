import * as decode from "jwt-decode";
import * as request from "./constants/request.config";
import Response from "./Response";
import * as ToastConfig from "./constants/toast.config";
import Axios from "axios";
import { toast } from "react-toastify";
import { createElement } from "react";
import ToastExport from "./components/toast/ToastExport";

export default class AuthService {
    // Initializing important variables
    user: Object;
    domain: string;

    constructor(domain?: string) {
        this.domain = domain || (window as any).env.restApi; // API server domain
        this.user = Object;
        this.fetch = this.fetch.bind(this); // React binding stuff
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.getUserInfos = this.getUserInfos.bind(this);
    }

    login(username: string, password: string) {
        // Get a token from api server using the fetch api
        return this.fetch(`${this.domain}/auth`, {
            method: "POST",
            body: JSON.stringify({
                username,
                password
            })
        }).then((response) => {
            this.setToken(response.content["token"]); // Setting the token in localStorage
            return Promise.resolve(response);
        });
    }

    loggedIn() {
        // Checks if there is a saved token and it"s still valid
        const token = this.getToken(); // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token); // handwaiving here
    }

    isTokenExpired(token: any) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return true;
        }
    }

    setToken(idToken: any) {
        // Saves user token to localStorage
        localStorage.setItem("id_token", idToken);
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem("id_token");
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem("id_token");
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }

    getUserInfos () {
        return this.fetch(`${this.domain}/user`, {
            method: "GET",
         }).then((res) => {
            if (res.status === 401) {
                res["content"]["message"] = "Account does not exist!";
                res["content"]["toast"] = ToastConfig.ERROR;
            }
            return Promise.resolve(res);
        });
    }
    
    getAllSharedDockerForUser() {
        return this.fetch(`${this.domain}/user/env/shared`, {
            method: "GET"
        }).then((res) => {
            return Promise.resolve(res);
        });
    }

    getAllUserDockerShared(id: number) {
        return this.fetch(`${this.domain}/user/env/${id}/shared`, {
            method: "GET"
        }).then((res) => {
            return Promise.resolve(res);
        });
    }

    getAllUsers() {
        return this.fetch(`${this.domain}/user/all`, {
            method: "GET"
        }).then((res) => {
            return Promise.resolve(res);
        });
    }

    editUser(user: Object) {
        return this.fetch(`${this.domain}/user`, {
            method: "PUT",
            body: JSON.stringify(user)
        }).then((res) => {
            return Promise.resolve(res);
        });
    }

    deleteUser() {
        return this.fetch(`${this.domain}/user`, {
            method: "DELETE",
        }).then((res) => {
            return Promise.resolve(res);
        });
    }

    createAccount(user: Object) {
        return this.fetch(`${this.domain}/user`, {
            method: "POST",
            body: JSON.stringify(user)
        }).then((res) => {
            if (res.status === 400) {
                res["content"]["message"] = "Username or Email is already in use!";
                res["content"]["toast"] = ToastConfig.ERROR;
            }
            return Promise.resolve(res);
        });
    }

    forgotPassword(email: string) {
        return this.fetch(`${this.domain}/user/forgottenpassword`, {
            method: "POST",
            body: email
        }).then((res) => {
            return Promise.resolve(res);
        });
    }

    checkTokenPassword(token: string) {
        return this.fetch(`${this.domain}/reset/${token}`, {
            method: "GET"
        }).then((res) => {
            return Promise.resolve(res);
        });
    }

    resetPassword(token: string, password: string) {
        return this.fetch(`${this.domain}/reset`, {
            method: "POST",
            body: JSON.stringify({"token": token, "password": password})
        }).then((res) => {
            return Promise.resolve(res);
        });
    }

    createDocker(name: string, idImage: number) {
        return this.fetch(`${this.domain}/containers/create`, {
            method: "POST",
            body: JSON.stringify({ "name": name, "imageId": idImage })
        }).then((res) => {
            if (res.status === 200) {
                res["content"]["message"] = "Docker created.";
                res["content"]["toast"] = ToastConfig.SUCCESS;
            } else {
                res["content"]["message"] = "Cannot create a new docker.";
                res["content"]["toast"] = ToastConfig.WARNING;
            }
            return Promise.resolve(res);
        });
    }

    deleteDocker(id: number) {
        return this.fetch(`${this.domain}/containers/${id}`, {
            method: "DELETE",
        }).then((res) => {
            if (res.status === 204) {
                res["content"]["message"] = "Docker deleted.";
                res["content"]["toast"] = ToastConfig.SUCCESS;
            } else {
                res["content"]["message"] = "Docker needs to be off to be deleted.";
                res["content"]["toast"] = ToastConfig.WARNING;
            }
            return Promise.resolve(res);
        });
    }

    startDocker(id: number) {
        return this.fetch(`${this.domain}/containers/${id}/start`, {
            method: "POST",
        }).then((res) => {
            if (res.status === 204) {
                res["content"]["message"] = "Docker started.";
                res["content"]["toast"] = ToastConfig.SUCCESS;
            } else {
                res["content"]["message"] = "Docker needs to be off to be started.";
                res["content"]["toast"] = ToastConfig.WARNING;
            }
            return Promise.resolve(res);
        });
    }

    stopDocker(id: number) {
        return this.fetch(`${this.domain}/containers/${id}/stop`, {
            method: "POST",
        }).then((res) => {
            if (res.status === 204) {
                res["content"]["message"] = "Docker stopped.";
                res["content"]["toast"] = ToastConfig.SUCCESS;
            } else {
                res["content"]["message"] = "Docker needs to be running to be stopped.";
                res["content"]["toast"] = ToastConfig.WARNING;
            }
            return Promise.resolve(res);
        });
    }

    pauseDocker(id: number) {
        return this.fetch(`${this.domain}/containers/${id}/pause`, {
            method: "POST",
        }).then((res) => {
            if (res.status === 204) {
                res["content"]["message"] = "Docker paused.";
                res["content"]["toast"] = ToastConfig.SUCCESS;
            } else {
                res["content"]["message"] = "Docker needs to be running to be paused.";
                res["content"]["toast"] = ToastConfig.WARNING;
            }
            return Promise.resolve(res);
        });
    }

    resumeDocker(id: number) {
        return this.fetch(`${this.domain}/containers/${id}/resume`, {
            method: "POST",
        }).then((res) => {
            if (res.status === 204) {
                res["content"]["message"] = "Docker resumed.";
                res["content"]["toast"] = ToastConfig.SUCCESS;
            } else {
                res["content"]["message"] = "Docker needs to be on pause to be resumed.";
                res["content"]["toast"] = ToastConfig.WARNING;
            }
            return Promise.resolve(res);
        });
    }

    renameDocker(id: number, name: string) {
        return this.fetch(`${this.domain}/containers/${id}/rename/${name}`, {
            method: "POST",
        }).then((res) => {
            if (res.status === 204) {
                res["content"]["message"] = "Environment renamed.";
                res["content"]["toast"] = ToastConfig.SUCCESS;
            } else {
                if (res["content"]["message"] === "REST API doesn't return any message") {
                    res["content"]["message"] = "Error trying to rename environment.";
                }
                res["content"]["toast"] = ToastConfig.ERROR;
            }
            return Promise.resolve(res);
        });
    }

    statsDocker(id: number) {
        return this.fetch(`${this.domain}/containers/${id}/stats`, {
            method: "GET",
        }).then((res) => {
            return Promise.resolve(res);
        });
    }

    exportContainer(id: number) {
        let toastId = toast(
            createElement(ToastExport, {loading: true, message: " Compressing environment..."}, null), 
            ToastConfig.LOADING_EXPORT  
        );
        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/octet-stream"
        };
        if (this.loggedIn()) {
            headers["Authorization"] = "Bearer " + this.getToken();
        }
        Axios({
            method: "get",
            url: `${this.domain}/containers/${id}/export`, 
            responseType: "blob",
            headers: headers
        })
        .then((response) => {
            toast.update(toastId, { type: toast.TYPE.SUCCESS, autoClose: 5000, render: "Done." });
            let fileName: string = `container_${id}.tar`;
            const contentDisposition = response["headers"]["content-disposition"];
            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                if (fileNameMatch.length === 2) {
                    fileName = fileNameMatch[1];
                }
            }
            const url = window.URL.createObjectURL(new Blob([response.data], {type: "application/octet-stream"}));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
            toast.update(toastId, { type: toast.TYPE.SUCCESS, autoClose: 5000, render: "It failed, sorry :(" });
        });
    }

    exportImage() {
        let toastId = toast(
            createElement(ToastExport, {loading: true, message: " Compressing image..."}, null), 
            ToastConfig.LOADING_EXPORT  
        );
        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/octet-stream"
        };
        if (this.loggedIn()) {
            headers["Authorization"] = "Bearer " + this.getToken();
        }
        Axios({
            method: "get",
            url: `${this.domain}/images/codechillaluna/code-chill-ide/get`, 
            responseType: "blob",
            headers: headers
        })
        .then((response) => {
            toast.update(toastId, { type: toast.TYPE.SUCCESS, autoClose: 5000, render: "Done." });
            let fileName: string = `code-chill-ide.tar`;
            const contentDisposition = response["headers"]["content-disposition"];
            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                if (fileNameMatch.length === 2) {
                    fileName = fileNameMatch[1];
                }
            }
            const url = window.URL.createObjectURL(new Blob([response.data], {type: "application/octet-stream"}));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
            toast.update(toastId, { type: toast.TYPE.SUCCESS, autoClose: 5000, render: "It failed, sorry :(" });
        });
    }

    getImages() {
        return this.fetch(`${this.domain}/images`, {
            method: "GET",
        }).then((res) => {
            return Promise.resolve(res);
        });
    }

    getUserImages() {
        return this.fetch(`${this.domain}/user/images`, {
            method: "GET",
        }).then((res) => {
            return Promise.resolve(res);
        });
    }

    getImage(id: number) {
        return this.fetch(`${this.domain}/images/${id}`, {
            method: "GET",
        }).then((res) => {
            return Promise.resolve(res);
        });
    }

    commitImage(id: number, name: string, version: string, privacy: boolean) {
        return this.fetch(`${this.domain}/containers/${id}/commit`, {
            method: "POST",
            body: JSON.stringify({ "name": name, "version": version, privacy: privacy })
        }).then((res) => {
            if (res.status === 201) {
                res["content"]["message"] = "Commit done.";
                res["content"]["toast"] = ToastConfig.SUCCESS;
            } else {
                res["content"]["message"] = "Could not commit.";
                res["content"]["toast"] = ToastConfig.ERROR;
            }
            return Promise.resolve(res);
        });
    }

    changePrivacy(id: number, privacy: boolean) {
        return this.fetch(`${this.domain}/images/${id}/privacy/${privacy}`, {
            method: "PUT",
        }).then((res) => {
            return Promise.resolve(res);
        });
    }

    shareEnv(idEnv: number, idUser: number) {
        return this.fetch(`${this.domain}/user/env/${idEnv}/share`, {
            method: "POST",
            body: JSON.stringify({ 
                "userId": idUser,
                "readOnly": true
            })
        }).then((res) => {
            if (res.status === 200) {
                res["content"]["message"] = "Successfully share your environment";
                res["content"]["toast"] = ToastConfig.SUCCESS;
            } else {
                res["content"]["message"] = "Could not share.";
                res["content"]["toast"] = ToastConfig.ERROR;
            }
            return Promise.resolve(res);
        });
    }

    removeShareEnv(idEnv: number, idUser: number) {
        return this.fetch(`${this.domain}/user/env/${idEnv}/share`, {
            method: "DELETE",
            body: JSON.stringify({ 
                "userId": idUser
            })
        }).then((res) => {
            if (res.status === 200) {
                res["content"]["message"] = "Successfully removing the sharing.";
                res["content"]["toast"] = ToastConfig.SUCCESS;
            } else {
                res["content"]["message"] = "Could not remove your sharing.";
                res["content"]["toast"] = ToastConfig.ERROR;
            }
            return Promise.resolve(res);
        });
    }

    checkUserHaveAccess (idEnv: number, idUser: number) {
        return this.fetch(`${this.domain}/user/env/${idEnv}/check`, {
            method: "GET"
        }).then((res) => {
            return Promise.resolve(res);
        });
    }

    parseResponse(res: any) {
        let response = new Response();
        response.status = res.status;
        response.statusText = res.statusText;
        response["content"]["message"] = "";
        if (!request.NO_CONTENTS.find((el) => el === res.status)) {
            let rjson = res.json();
            return rjson.then((r) => {
                response["content"] = r;
                if (!response["content"]["message"]) {
                    response["content"]["message"] = "REST API doesn't return any message";
                }
                return Promise.resolve(response);
            });
        } else {
            return Promise.resolve(response);
        }
    }

    fetch(url: any, options: any) {
        // performs api calls sending the required authentication headers
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        };

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers["Authorization"] = "Bearer " + this.getToken();
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then((res) => {
                return Promise.resolve(this.parseResponse(res));
            }).catch((error) => {
                return Promise.resolve({ "content": { "error": true, "message": error.message } });
            });
    }
}
