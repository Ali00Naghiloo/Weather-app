import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tempUnit: " °c",
};

export const tempUnitSlice = createSlice({
    name: "tempUnit",
    initialState,
    reducers: {
        setTempUnit: (state, action) => {
            state.tempUnit = action.payload;
        },
    }
});

export const { setTempUnit } = tempUnitSlice.actions;
export default tempUnitSlice.reducer;