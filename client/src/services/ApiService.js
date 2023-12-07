import { AuthService } from "./AuthService.js";
// import i18n from "i18n";

const Api = {
  //
  // GENERIC
  getHeaders: function (method = "GET") {
    const headers = {};
    // headers["Accept-Language"] = i18n.language;
    // if (AuthService.currentUserValue()) {
    //   const token = AuthService.getToken();
    //   headers.Authorization = token;
    //   return headers;
    // }
  },

  handleErrors: function (response) {
    if (response.ok) {
      return response;
    }
    if (response.status === 401) {
      AuthService.logout();
    }
    if (response.status === 403) {
      response.json().then((data) => {
        if (
          "code" in data &&
          (data.code === "token_not_valid" ||
            data.code === "user_not_found" ||
            data.code === "user_inactive")
        ) {
          AuthService.logout();
        }
      });
    }
    throw response;
  },

  getUrlWithParams: function (path, params = {}) {
    const url = new URL(path);
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined) {
        url.searchParams.append(key, params[key]);
      }
    });
    return url;
  },

  fetch: (url, method = "GET", data = null) => {
    // const headers = Api.getHeaders();

    const info = Object.assign(
      {},
      {
        method,
        headers: {
          // ...headers,
          "Content-Type": "application/json",
        },
      },
      data && method !== "GET" ? { body: JSON.stringify(data) } : null
    );

    // url = data && method === "GET" ? Api.getUrlWithParams(url, data) : url;

    return fetch(url, info)
      .then(Api.handleErrors)
      .then((resp) => {
        if (resp.status === 204) {
          return null;
        }
        return resp.json();
      });
  },

  fetchNoToken: (url, method = "GET", data = null) => {
    const info = Object.assign(
      {},
      {
        method,
        headers: {
          "Content-Type": "application/json",
          // "Accept-Language": i18n.language,
        },
      },
      data && method !== "GET" ? { body: JSON.stringify(data) } : null
    );

    url = data && method === "GET" ? Api.getUrlWithParams(url, data) : url;

    return fetch(url, info)
      .then(Api.handleErrors)
      .then((resp) => {
        if (resp.status === 204) {
          return null;
        }
        return resp.json();
      });
  },

  fetchDownload: (url, method = "GET", data = null) => {
    const headers = Api.getHeaders();
    const info = Object.assign(
      {},
      {
        method,
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
      },
      data && method !== "GET" ? { body: JSON.stringify(data) } : null
    );

    url = data && method === "GET" ? Api.getUrlWithParams(url, data) : url;

    return fetch(url, info)
      .then(Api.handleErrors)
      .then((resp) => resp.blob());
  },

  fetchUpload: (url, method = "POST", form) => {
    const headers = Api.getHeaders();
    const info = Object.assign(
      {},
      {
        method,
        headers: {
          ...headers,
          // 'Content-Type': 'multipart/form-data'
        },
        body: form,
      }
    );

    return fetch(url, info)
      .then(Api.handleErrors)
      .then((resp) => {
        if (resp.status === 204) {
          return null;
        }
        return resp.json();
      });
  },
};

export default Api;
