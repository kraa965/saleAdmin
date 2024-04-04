import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	update: 0,
	addShift: 1, 
	editNew: {
		status:0,
		id: 0,
	},

};
const schedulSlice = createSlice({
	name: 'skills',
	initialState,

	reducers: {
		setUpdate(state, action) {
			state.update = state.update + 1;
		},

		setEditNew(state, action) {
			state.editNew = action.payload;
		},
	},
});

export const {
	setUpdate,
	setEditNew,
} = schedulSlice.actions;

export default schedulSlice.reducer;
