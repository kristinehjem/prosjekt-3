import { createSlice} from '@reduxjs/toolkit';

export const modalInfoSlice = createSlice({
    name: "modalInfo",
    initialState: {value: {title: "", year: "0", image: "", rating: "0", rank: "0", imdbRatingCount: "0", stars: 0, showing: false} },
    reducers: {
        updateModalInfo: (state, action) => {
            state.value = action.payload
        },
    },
});

export default modalInfoSlice.reducer;

export const { updateModalInfo } = modalInfoSlice.actions

