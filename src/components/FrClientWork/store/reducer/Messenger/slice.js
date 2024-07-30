import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    message: {},
    messageStatus: {},
    notifications: {}
};

const MessengerSlice = createSlice({
    name: 'MessengerSlice',
    initialState,

    reducers: {
        setMessageMessanger(state, actions) {
            state.message = actions.payload;
        },

        setNotifications(state, actions) {
            state.notifications = actions.payload;
        },

        setMessageStatus(state, actions) {
            state.messageStatus = actions.payload;
        },
    },
});

export const {
    setMessageMessanger,
    setNotifications,
    setMessageStatus,
} = MessengerSlice.actions;

export default MessengerSlice.reducer;
