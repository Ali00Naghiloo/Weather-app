import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    coords: {
        lat: "",
        lon: "",
    }
};

export const coordsSlice = createSlice({
    name: "coordsSlice",
    initialState,
    reducers: {
        setCoords: (state, action) => {
            state.coords = action.payload;
        },
    }
});

export const { setCoords } = coordsSlice.actions;
export default coordsSlice.reducer;