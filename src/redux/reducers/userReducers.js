import { createReducer } from "@reduxjs/toolkit";
import userActions from "../actions/userActions";

const { login, reLogin, logout, updateUser } = userActions;

const initialState = {
    id: '',
    name: '',
    email: '',
    photo: '',
    role: '',
    online: false,
    token: '',
    user: {},
};

const userReducers = createReducer(initialState, (builder) => {
    builder
        .addCase(login.fulfilled, (state, action) => {
            const { success, response } = action.payload;
            if (success) {
                let { user, token } = response
                localStorage.setItem("token", JSON.stringify({ token: { user: token } }))
                return { ...state,user:user, id: user.id, name: user.name, email: user.email, photo: user.photo, role: user.role, online: true, token: token }
            } else {
                return { ...state, message: response }
            }
        })
        .addCase(reLogin.fulfilled, (state, action) => {
            let { success, response } = action.payload;
            let { user, token } = response
            if (success) {
                return { ...state,user:user, id: user.id, name: user.name, email: user.email, photo: user.photo, role: user.role, online: true, token: token }
            } else {
                return { ...state }
            }
        })
        .addCase(logout.fulfilled, (state, action) => {
            const { success, response } = action.payload;
            if (success) {
                localStorage.removeItem("token")
                return { ...state, id: '', name: '', email: '', photo: '', role: '', online: false, token: '' }
            } else {
                return { ...state, mensaje: response }
            }
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            const { success, response } = action.payload;
            if (success) {
                return { ...state, user: response }
            } else {
                return { ...state, mensaje: response }
            }
        })
})

export default userReducers