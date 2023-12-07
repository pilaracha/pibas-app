import { BehaviorSubject } from "rxjs";
import User from "../models/User";

const currentUserSubject = new BehaviorSubject(null);

export const AuthService = {
  expirationTime: 60 * 60, // Seconds
  idleInterval: null,
  idleTime: 0,
  currentUser: currentUserSubject.asObservable(),

  currentUserValue: () => {
    return currentUserSubject.value;
  },

  login: (googleUser) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_token: googleUser.tokenId,
        firstName: googleUser.profileObj.givenName,
        lastName: googleUser.profileObj.familyName,
        email: googleUser.profileObj.email,
      }),
    };

    return fetch("/auth/login", requestOptions).then((response) => {
      if (response.ok) {
        return response.json().then((data) => {
          localStorage.setItem("access", data.data.accessToken);
          return data;
        });
      }
      throw response;
    });
  },

  logout: () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    return fetch("/auth/logout", requestOptions).then((response) => {
      if (response.ok) {
        return response.json().then((data) => {
          // remove user from local storage to log user out
          localStorage.removeItem("currentUser");
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          currentUserSubject.next(null);
          AuthService.removeListeners();
          return data;
        });
      }
      throw response;
    });
  },

  // carga los datos del usuario
  loadUser: async (refresh = false) => {
    if (refresh) {
      await AuthService.refresh();
    }

    return new Promise(async (resolve, reject) => {
      const access = localStorage.getItem("access");
      if (!access) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject("No Access");
        return;
      }

      const userResponse = await fetch("/auth/user");
      const userData = await userResponse.json();
      const user = new User({
        id: userData.user._id,
        username: userData.user.firstName,
        email: "visualizaciones.pibas@gmail.com",
        is_active: true,
      });

      localStorage.setItem("currentUserPIBAS", JSON.stringify(user));

      currentUserSubject.next(user);
      AuthService.startListeners();
      resolve(user);

    });
  },

  getToken() {
    return `Bearer ${localStorage.getItem("access")}`;
  },


  removeListeners: () => {
    document.removeEventListener("keypress", AuthService.resetIdle, false);

    if (AuthService.idleInterval) clearInterval(AuthService.idleInterval);
  },

  startListeners: () => {
    AuthService.idleInterval = setInterval(AuthService.timerIncrement, 1000);
    document.addEventListener("mousemove", AuthService.resetIdle, false);
    document.addEventListener("keypress", AuthService.resetIdle, false);
  },
};
