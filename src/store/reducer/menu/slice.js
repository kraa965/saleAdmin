import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	menu: '',
	dark: JSON.parse(localStorage.getItem('darkTheme')) || false,
	directorProgressDay: 0,
};

const menuSlice = createSlice({
	name: 'menu',
	initialState,

	reducers: {
		setMenuStatus(state, action) {
			state.menu = action.payload;
		},

		setDark(state, action) {
			state.dark = action.payload;
		},

		setDirectorProgressDay(state, action) {
			state.directorProgressDay = action.payload;
		},
	},
});

export const {
	setMenuStatus,
	setDark,
	setDirectorProgressDay
} = menuSlice.actions;

export default menuSlice.reducer;
