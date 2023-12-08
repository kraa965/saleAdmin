import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	menu: '',
	dark: JSON.parse(localStorage.getItem('darkTheme')) || false,
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
	},
});

export const {
	setMenuStatus,
	setDark
} = menuSlice.actions;

export default menuSlice.reducer;
