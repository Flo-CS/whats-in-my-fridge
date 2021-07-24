import {createSlice} from "@reduxjs/toolkit";

const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        sortOptions: {
            name: "NAME",
            direction: "asc"
        },
        text: ""

    },
    reducers: {
        setSortOptions: (state, action) => {
            state.sortOptions = action.payload;
        },
        setTextFilter: (state, action) => {
            state.text = action.payload;
        }
    }
});


function selectSortOptions(state) {
    return state.filters.sortOptions;
}

export {selectSortOptions};

export const {setSortOptions, setTextFilter} = filtersSlice.actions;

export default filtersSlice.reducer;