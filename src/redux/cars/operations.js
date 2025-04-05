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

export const fetchCarsWithParams = createAsyncThunk('cars/fetchCarsWithParams',
    async (body, thunkAPI) => {
        try {
            const {data} = await axios.get(`cars`, {params: body});
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    },
);

export const fetchCarById = createAsyncThunk('cars/fetchCarById',
    async (body, thunkAPI) => {
        try {
            const {data} = await axios.get(`cars/${body}`);
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    },
);