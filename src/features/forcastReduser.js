import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    forcast: {
        cityName: "",
        weatherIco: "",
        temp: "",
        feelLike: "",
        description: "",
        cityReq1: "",
        countryReq1: "",
        humidity: "",
        windSpeed: "",
        sunrise: "",
        sunset: "",
        cloud: "",
        UVindex: "",
        pressure: "",
        tempUnit: " °c",
    },
};

export const forcastSlice = createSlice({
    name: "forcasts",
    initialState,
    reducers: {
        setForcast: (state, action) => {
            state.forcast = action.payload;
        },
    }
});

export const { setForcast } = forcastSlice.actions;
export default forcastSlice.reducer;