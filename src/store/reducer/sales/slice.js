import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	dateMonth: '',
	dayMonth: 30,
	nameMonth: '',
	nameMonth2: '',
	monthIndex: 0,
	day: 1,
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

		setMonthIndex(state, action) {
			state.monthIndex = action.payload;
		},

		setDay(state, action) {
			state.day = action.payload;
		},
	},
});

export const {
	setDateMonth,
	setDayMonth,
	setNameMonth,
	setNameMonth2,
	setMonthIndex,
	setDay
} = salesSlice.actions;

export default salesSlice.reducer;
