import httpClient from "../../api/httpClient";

const signIn = data => httpClient("http://localhost:3500/auth", { method: "POST", data }, true)
const signUp = data => httpClient("http://localhost:3500/register", { method: "POST", data }, true)
const logOut = data => httpClient("http://localhost:3500/logout", {}, true)

export default {
    signIn,
    signUp,
    logOut
}