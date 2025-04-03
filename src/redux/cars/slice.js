import { createSlice } from "@reduxjs/toolkit";
import { fetchCarBrands, fetchCarsWithParams } from "./operations.js";


const initialState = {
    carsArray: [],
    favoritesCars: [],
    carBrands: [],
    carsPrice: [30, 40, 50, 60, 70, 80],
    isError: null,
    isLoading: false,
};

const handlePending = state => {
    state.isLoading = true;
    state.isError = null;
};

const handleRejected = (state, { payload }) => {
state.isLoading = false;
state.isError = payload;
};

const slice = createSlice({
    name: 'cars',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchCarBrands.pending, handlePending)
            .addCase(fetchCarBrands.rejected, handleRejected)
            .addCase(fetchCarBrands.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                state.isError = null;
                state.carBrands = payload;
            })
            .addCase(fetchCarsWithParams.pending, handlePending)
            .addCase(fetchCarsWithParams.rejected, handleRejected)
            .addCase(fetchCarsWithParams.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                state.isError = null;
                if (payload.page > 1) {
                    const newUniqueCars = payload.cars.filter(car => {
                        return !state.carsArray.some(existingCar => existingCar.id === car.id);
                    });
                    state.carsArray.push(...newUniqueCars);
                    return;
                }                
                state.carsArray = payload.cars;
            })
        },
    }
);

export const carsReducer = slice.reducer;