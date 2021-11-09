import authStorage from "./storage";

export const logutUser = (setToken) => {
    authStorage.removeToken();
    setToken(null);
}