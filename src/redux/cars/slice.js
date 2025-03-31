import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    carsArray: [],
    favoritesCars: [],
    isError: null,
    isRefreshing: false,
};

const handlePending = state => {
    state.isRefreshing = true;
    state.isError = null;
};

const handleRejected = (state, { payload }) => {
state.isLoading = false;
state.isRefreshing = false;
state.isError = payload;
};

const slice = createSlice({
    name: 'cars',
    initialState,
    // extraReducers: builder => {
    //     builder
    //         .addCase()
    // },
});

export const carsReducer = slice.reducer;