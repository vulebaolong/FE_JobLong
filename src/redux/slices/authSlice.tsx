import { ACCESS_TOKEN, USER_LOGIN } from '@/constant/userContants';
import { lcStorage } from '@/helpers/localStorage';
import { IUserLogin } from '@/interface/auth';
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
    userLogin: IUserLogin;
    accessToken: string;
}

const initialState: IInitialState = {
    userLogin: lcStorage.get(USER_LOGIN),
    accessToken: lcStorage.get(ACCESS_TOKEN),
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        loginAuth: (state, { payload }) => {
            state.userLogin = payload.userLogin;
            state.accessToken = payload.accessToken;
        },
    },
});

export const { loginAuth } = authSlice.actions;

export default authSlice.reducer;
