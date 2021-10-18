import { createSlice} from '@reduxjs/toolkit';

type IState = {[key: string]: boolean};

let initState : IState = {"1950's": false, "1960's": false, "1970's": false, "1980's": false, "1990's": false, "2000's": false, "2010's": false}

export const yearFilterSlice = createSlice({
    name: "yearFilter",
    initialState: initState,
    reducers: {
        updateYearFilter: (state, action) => {
            state = action.payload
        },
    },
});

export default yearFilterSlice.reducer;

export const { updateYearFilter } = yearFilterSlice.actions
