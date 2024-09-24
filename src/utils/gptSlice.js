import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        shoeGptSearch: false,
    },
    reducers: {
        toggleGptSearchView : (state, action ) => {
            state.showGptSearch = !state.showGptSearch;
        },
    },
});

export const { toggleGptSearchView } = gptSlice.actions;

export default gptSlice.reducer;