import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	managerUpdate: {},
	managerUpdateAvatar: {},
	updateManagersList: 0,
};

const mangerUpdateSlice = createSlice({
	name: 'mangerUpdate',
	initialState,

	reducers: {

		setManagerUpdate(state, action) {
			state.managerUpdate = action.payload;
		},

		setManagerUpdateAvatar(state, action) {
			state.managerUpdateAvatar = action.payload;
		},

		setUpdateManagersList(state) {
			state.updateManagersList = state.updateManagersList + 1;
		},
	},
});

export const {
	setManagerUpdate,
	setManagerUpdateAvatar,
	setUpdateManagersList
} = mangerUpdateSlice.actions;

export default mangerUpdateSlice.reducer;
