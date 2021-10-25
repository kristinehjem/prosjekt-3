import { createSlice} from '@reduxjs/toolkit';

export const modalInfoSlice = createSlice({
    name: "modalInfo",
    initialState: {value: {id: '0', title: "", year: "0", image: "", rating: "0", rank: "0", imdbRatingCount: "0", stars: 0, disableRating: false, showing: false} },
    reducers: {
        updateModalInfo: (state, action) => {
            state.value = action.payload
        },
    },
});

export default modalInfoSlice.reducer;

export const { updateModalInfo } = modalInfoSlice.actions

