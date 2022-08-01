import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hourly: []
};

export const hourlySlice = createSlice({
    name: "hourlyWeather",
    initialState,
    reducers: {
        setHourly: (state, action) => {
            state.hourly = action.payload;
        },
    }
});

export const { setHourly } = hourlySlice.actions;
export default hourlySlice.reducer;