import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    updateFavorites: [],
    updateNoFavorites: [],
    handOverClients: [],
};

const UpdaterSlice = createSlice({
    name: 'UpdaterSlice',
    initialState,

    reducers: {
        setUpdateFavorites(state, action) {
            state.updateFavorites = [... state.updateFavorites, action.payload]
        },

        setDeleteUpdateFavorites(state, action) {
            state.updateFavorites = [...state.updateFavorites].filter(el => el !== action.payload)
        },

        setUpdateNoFavorites(state, action) {
            state.updateNoFavorites = [... state.updateFavorites, action.payload]
        },

        setDeleteUpdateNoFavorites(state, action) {
            state.updateNoFavorites = [...state.updateFavorites].filter(el => el !== action.payload)
        },

        setHandOverClients(state, action) {
            state.handOverClients = [... state.handOverClients, action.payload]
        },
    },
});

export const {
    setUpdateFavorites,
    setDeleteUpdateFavorites,
    setUpdateNoFavorites,
    setDeleteUpdateNoFavorites,
    setHandOverClients
} = UpdaterSlice.actions;

export default UpdaterSlice.reducer;
