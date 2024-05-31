import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    experts: [],
};

const ExpertsSlice = createSlice({
    name: 'ExpertsSlice',
    initialState,

    reducers: {
        setExperts(state, action) {
            state.experts = action.payload;
        },
    }
});

export const {
    setExperts
} = ExpertsSlice.actions;

export default ExpertsSlice.reducer;
