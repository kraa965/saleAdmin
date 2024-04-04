import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	filledStage: 0,
	name: JSON.parse(localStorage.getItem('addName')) || '',
	secondName: JSON.parse(localStorage.getItem('addSecondName')) || '',
	sex: JSON.parse(localStorage.getItem('addSex')) || '',
	hbDate: JSON.parse(localStorage.getItem('addHbDate')) || '',
	tel: JSON.parse(localStorage.getItem('addTel')) || '',
	mango: JSON.parse(localStorage.getItem('addMango')) || '',
	login: JSON.parse(localStorage.getItem('addLogin')) || '',
	password: JSON.parse(localStorage.getItem('addPassword')) || '',
	format: JSON.parse(localStorage.getItem('format')) || 'Офис',
	startDate: JSON.parse(localStorage.getItem('startDateManager')) || '',
	shedule: JSON.parse(localStorage.getItem('shedule')) || 0,
	shedule2: JSON.parse(localStorage.getItem('shedule2')) || 0,
	photo: JSON.parse(localStorage.getItem('photo')) || {},
};

const addWorkSlice = createSlice({
	name: 'addWork',
	initialState,

	reducers: {

		setFilledStage(state, action) {
			state.filledStage = action.payload;
		},

		setName(state, action) {
			state.name = action.payload;
		},

		setSecondName(state, action) {
			state.secondName = action.payload;
		},

		setSex(state, action) {
			state.sex = action.payload;
		},

		setHbDate(state, action) {
			state.hbDate = action.payload;
		},

		setTel(state, action) {
			state.tel = action.payload;
		},

		setMango(state, action) {
			state.mango = action.payload;
		},

		setLogin(state, action) {
			state.login = action.payload;
		},

		setPassword(state, action) {
			state.password = action.payload;
		},

		setFormat(state, action) {
			state.format = action.payload;
		},

		setStartDate(state, action) {
			state.startDate = action.payload;
		},

		setShedule(state, action) {
			state.shedule = action.payload;
		},

		setShedule2(state, action) {
			state.shedule2 = action.payload;
		},

		setPhoto(state, action) {
			state.photo = action.payload;
		},
	},
});

export const {
	setName,
	setSecondName,
	setSex,
	setHbDate,
	setTel,
	setMango,
	setLogin,
	setPassword,
	setFilledStage,
	setFormat,
	setStartDate,
	setShedule,
	setShedule2,
	setPhoto
} = addWorkSlice.actions;

export default addWorkSlice.reducer;
