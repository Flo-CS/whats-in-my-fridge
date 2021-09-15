import {createSlice} from "@reduxjs/toolkit";
import {SORT_OPTIONS} from "../helpers/constants";

const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        sortParameters: {
            key: SORT_OPTIONS.NAME.key,
            direction: SORT_OPTIONS.NAME.defaultDirection
        },
        text: ""

    },
    reducers: {
        setSortParameters: (state, action) => {
            state.sortParameters = action.payload;
        },
        setTextFilter: (state, action) => {
            state.text = action.payload;
        }
    }
});


function selectSortParameters(state) {
    return state.filters.sortParameters;
}

export {selectSortParameters};

export const {setSortParameters, setTextFilter} = filtersSlice.actions;

export default filtersSlice.reducer;