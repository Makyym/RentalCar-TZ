import { createSlice } from '@reduxjs/toolkit';
import { fetchCarsWithParams } from '../cars/operations.js';

const initialState = {
    filters: {   
        brand: null,
        rentalPrice: null,
        minMileage: null,
        maxMileage: null,
        limit: 12,
        page: 1,
    },
    totalPages: null,
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
        incrementPage(state) {
            state.filters.page += 1;
        },      
    },
    extraReducers: builder => {
        builder.addCase(fetchCarsWithParams.fulfilled, (state, { payload }) => {
            state.totalPages = payload.totalPages;
        });
    },    
});

export const { setFilters, resetFilters, incrementPage } = slice.actions;
export const filterReducer =  slice.reducer;