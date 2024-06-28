import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loadPage: true,
    loadManager: true,
    loadClient: false,
    loadPartners: true,
    disabledMyClients: false,
    callStatus: '',
};

const AppSlice = createSlice({
    name: 'AppSlice',
    initialState,

    reducers: {
        
        setLoadPage(state, action) {
            state.loadPage = action.payload;
        },

        setLoadManager(state, action) {
            state.loadManager = action.payload;
        },

        setLoadClient(state, action) {
            state.loadClient = action.payload;
        },

        setLoadPartners(state, action) {
            state.loadPartners = action.payload;
        },

        setDisabledMyClients(state, action) {
            state.disabledMyClients = action.payload;
        },

        setCallStatus(state, action) {
            state.callStatus = action.payload;
        }
    },
});

export const {
    setLoadPage,
    setLoadManager,
    setLoadClient,
    setLoadPartners,
    setDisabledMyClients,
    setCallStatus
} = AppSlice.actions;

export default AppSlice.reducer;
