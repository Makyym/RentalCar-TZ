import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://car-rental-api.goit.global';

export const fetchCarBrands = createAsyncThunk(
    'cars/fetchCarBrands',
    async (_, thunkAPI) => {
    try {
        const {data} = await axios.get(`brands`);
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
    },
);

export const fetchAllCars = createAsyncThunk(
    'cars/fetchAllCars',
    async (_, thunkAPI) => {
    try {
        const {data} = await axios.get(`cars`);
        return data.cars;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
    },
);