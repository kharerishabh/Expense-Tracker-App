import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {signUP: false, isAuthenticated: false, email: null, token: null}
const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        signup(state, action) {
            state.signUP = !state.signUP
        },
        login(state, action) {
            state.isAuthenticated = true
            state.email = action.payload.email
            state.token = action.payload.token
        },
        logout(state) {
            state.isAuthenticated = false
            state.token = null
            state.email = null
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice;