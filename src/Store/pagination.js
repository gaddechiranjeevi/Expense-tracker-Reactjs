import { createSlice } from '@reduxjs/toolkit';

const initialPagination = {
    expensePagination : []
};

const paginationSlice = createSlice({
    name: 'pagination',
    initialState: initialPagination,
    reducers: {
        setExpensePagination(state, action) {
            state.expensePagination = action.payload
        }
    }
})

export const paginationAction = paginationSlice.actions;
export default paginationSlice.reducer;