import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
    listPermissionSelectedCreate: string[];
    listPermissionSelectedEdit: string[];
}

const initialState: IInitialState = {
    listPermissionSelectedCreate: [],
    listPermissionSelectedEdit: [],
};

const roleSlice = createSlice({
    name: 'roleSlice',
    initialState,
    reducers: {
        addPermissionSelectedCreate: (state, { payload }: { payload: string }) => {
            state.listPermissionSelectedCreate.push(payload);
        },
        removePermissionSelectedCreate: (state, { payload }: { payload: string }) => {
            state.listPermissionSelectedCreate = state.listPermissionSelectedCreate.filter(
                (item) => item !== payload,
            );
        },
        addPermissionSelectedEdit: (state, { payload }) => {
            state.listPermissionSelectedEdit.push(payload);
        },
        removePermissionSelectedEdit: (state, { payload }) => {
            state.listPermissionSelectedEdit = state.listPermissionSelectedEdit.filter(
                (item) => item !== payload,
            );
        },
        setInitPermissionSelectedEdit: (state, { payload }) => {
            state.listPermissionSelectedEdit = payload;
        },
    },
});

export const {
    addPermissionSelectedCreate,
    removePermissionSelectedCreate,
    addPermissionSelectedEdit,
    removePermissionSelectedEdit,
    setInitPermissionSelectedEdit,
} = roleSlice.actions;

export default roleSlice.reducer;
