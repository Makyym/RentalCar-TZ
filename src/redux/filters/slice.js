import { createSlice } from '@reduxjs/toolkit';
import { fetchCarsWithParams } from '../cars/operations.js';

const initialState = {
    filters: {   
        brand: null,
        rentalPrice: null,
        minMileage: null,
        maxMileage: null,
    },
    page: 1,
    limit: 12,
    totalPages: null,
};

const slice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilters(state, {payload}) {
            const {page, ...rest} = payload;
            state.filters = rest;
            state.page = page;
        },
        resetFilters() {
        return initialState;
        },
        incrementPage(state) {
            state.page += 1;
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