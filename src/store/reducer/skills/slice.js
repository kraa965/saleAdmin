import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	skillId: '0',
	skillWindow: '',
	homeWorkModal: false,

};

const skillsSlice = createSlice({
	name: 'skills',
	initialState,

	reducers: {
		setSkillId(state, action) {
			state.skillId = action.payload;
		},

		setSkillWindow(state, action) {
			state.skillWindow = action.payload;
		},

		setHomeWorkModal(state, action) {
			state.homeWorkModal = action.payload;
		}
	},
});

export const {
	setSkillWindow,
	setSkillId,
	setHomeWorkModal
} = skillsSlice.actions;

export default skillsSlice.reducer;
