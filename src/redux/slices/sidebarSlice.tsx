import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
    sidebarOpen: boolean;
}

const initialState: IInitialState = {
    sidebarOpen: true,
};

const sidebarSlice = createSlice({
    name: 'sidebarSlice',
    initialState,
    reducers: {
        setSidebarOpen: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
    },
});

export const { setSidebarOpen } = sidebarSlice.actions;

export default sidebarSlice.reducer;
