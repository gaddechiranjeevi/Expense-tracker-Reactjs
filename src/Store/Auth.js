import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isAuthenticated: false,
    itemList: [],
};

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers:{
        login(state){
            state.isAuthenticated=true;
        },
        logout(state){
            state.isAuthenticated=false;
        },
        checker(state){
            const localIsLogin = localStorage.getItem('JWTTOKEN');
        if(localIsLogin ===null){
            state.isAuthenticated = false;
        }else if(localIsLogin === ''){
            state.isAuthenticated =false;
        }else if(localIsLogin.trim().length > 0){
            state.isAuthenticated = true;
        }
        }

    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;