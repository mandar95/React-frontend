import { createSlice } from '@reduxjs/toolkit'
import service from "./login.service"
import SecureLS from "secure-ls";

const ls = new SecureLS();

const initialState = {
    userInfo: {},
    userName: "Mandar",
    isAuthenticated: (!!ls.get("token")) || false,
    loggedInUser: !!ls.get("loggedInUser") || null,
    logoutResp: null,
    TokenResp: {},
    getExpiryResp: {},
    loading: false,
    success: null,
    error: null,
    isUserApplication: null,//demo
    useType: null//demo
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        storeLoginInfo: (state, action) => {
            state.userInfo = action.payload;
            state.loading = false;
            state.error = null
        },
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null
        },
        logOutSuccess: (state, action) => {
            state.isAuthenticated = false;
            // state.loading = false;
            state.error = null
        },
        loading: (state, action) => {
            state.loading = action.payload
        },
        success: (state, action) => {
            state.success = action.payload;
            state.loading = false;
            state.error = null
        },
        clear: (state) => {
            state.success = null;
            state.loading = false;
            state.error = null
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, storeLoginInfo, success, loading, loginSuccess, logOutSuccess, clear } = loginSlice.actions

export const signUpAction = (payload) => {
    return async dispatch => {
        dispatch(loading(true))
        try {
            const { data } = await service.signUp(payload)
            if (data?.status) {
                dispatch(success(data.message))
            } else {
                //console.log("error")
            }
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const signInAction = (payload) => {
    return async dispatch => {
        dispatch(loading(true))
        try {
            const { data } = await service.signIn(payload)
            if (data?.status) {
                ls.set("token", data.api_token);
                ls.set("session", Date.now() + 15 * 60 * 1000); //expire after 15 minute
                dispatch(loginSuccess())
            } else {
                //console.log("error")
            }
        }
        catch (err) {
            console.log(err)
        }
    }
}



export const logOutAction = (navigate) => {
    return async dispatch => {
        dispatch(loading(true))
        try {
            const { data } = await service.logOut()
            // if (data?.status) {
            ls.remove("token");
            ls.remove("session");
            dispatch(logOutSuccess())
            navigate('/sign-in')
            //  } else {
            //console.log("error")
            // }
        }
        catch (err) {
            console.log(err)
        }
    }
}

export default loginSlice.reducer