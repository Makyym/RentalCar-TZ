import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    brand: null,
    rentalPrice: null,
    minMileage: null,
    maxMileage: null,
    limit: 12,
    page: 1,
};

const slice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilters(state, {payload}) {
        return { ...state, ...payload };
        },
        resetFilters() {
        return initialState;
        },
    },
});

export const { setFilters, resetFilters } = slice.actions;
export const filterReducer =  slice.reducer;