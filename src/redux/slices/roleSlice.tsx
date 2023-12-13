import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
    listPermissionSelected: string[];
    switchModule: boolean;
}

const initialState: IInitialState = {
    listPermissionSelected: [],
    switchModule: false,
};

const roleSlice = createSlice({
    name: 'roleSlice',
    initialState,
    reducers: {
        addPermissionSelected: (state, { payload }: { payload: string }) => {
            state.listPermissionSelected.push(payload);
            state.switchModule = true;
        },
        removePermissionSelected: (state, { payload }: { payload: string }) => {
            state.listPermissionSelected = state.listPermissionSelected.filter(
                (item) => item !== payload,
            );
        },
    },
});

export const { addPermissionSelected, removePermissionSelected } = roleSlice.actions;

export default roleSlice.reducer;
