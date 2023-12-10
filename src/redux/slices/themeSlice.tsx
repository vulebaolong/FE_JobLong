import { PaletteMode } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
    mode: PaletteMode;
}

const initialState: IInitialState = {
    mode: 'dark',
};

const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'dark' ? 'light' : 'dark';
        },
    },
});

export const { setMode } = themeSlice.actions;

export default themeSlice.reducer;
