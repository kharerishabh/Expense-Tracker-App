import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: 'profile',
    initialState: {profile: null},
    reducers: {
        replaceProfile (state, action) {
            state.profile = action.payload
        },
        updateProfile (state, action) {
            state.profile = action.payload
        }
    }
})

export const profileAction = profileSlice.actions
export default profileSlice;