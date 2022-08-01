import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    backMode: "light"
};

export const backgroundSlice = createSlice({
    name: "backMode",
    initialState,
    reducers: {
        setBackMode: (state, action) => {
            state.backMode = action.payload;
        },
    }
});

export const { setBackMode } = backgroundSlice.actions;
export default backgroundSlice.reducer;