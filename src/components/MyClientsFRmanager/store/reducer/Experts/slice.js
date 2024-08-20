import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    experts: JSON.parse(localStorage.getItem('expertsList')) || [],
    consultants: JSON.parse(localStorage.getItem('consultantsList')) || [],
};

const ExpertsSlice = createSlice({
    name: 'ExpertsSlice',
    initialState,

    reducers: {
        setExperts(state, action) {
            state.experts = action.payload;
        },

        setConsultants(state, action) {
            state.consultants = action.payload;
        },
    }
});

export const {
    setExperts,
    setConsultants
} = ExpertsSlice.actions;

export default ExpertsSlice.reducer;
