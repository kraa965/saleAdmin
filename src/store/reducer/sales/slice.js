import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	dateMonth: '',
	dayMonth: 30,
	nameMonth: '',
	nameMonth2: '',
};

const salesSlice = createSlice({
	name: 'sales',
	initialState,

	reducers: {
		setDateMonth(state, action) {
			state.dateMonth = action.payload;
		},

		setDayMonth(state, action) {
			state.dayMonth = action.payload;
		},

		setNameMonth(state, action) {
			state.nameMonth = action.payload;
		},

		setNameMonth2(state, action) {
			state.nameMonth2 = action.payload;
		},
	},
});

export const {
	setDateMonth,
	setDayMonth,
	setNameMonth,
	setNameMonth2
} = salesSlice.actions;

export default salesSlice.reducer;
