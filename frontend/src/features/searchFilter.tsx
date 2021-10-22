import { createSlice} from '@reduxjs/toolkit';

export const searchFilterSlice = createSlice({
    name: "searchFilter",
    initialState: {value: {title: ""}},
    reducers: {
        updateSearchFilter: (state, action) => {
            state.value = action.payload
        },
    },
});

export default searchFilterSlice.reducer;

export const { updateSearchFilter } = searchFilterSlice.actions
