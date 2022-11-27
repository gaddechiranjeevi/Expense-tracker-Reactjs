import { createSlice } from "@reduxjs/toolkit";

const initialItemList ={
    itemList: [],

};

const itemListSlice = createSlice({
    name: 'dataFetching',
    initialState: initialItemList,
    reducers:{
         newExpenses(state ,action){  
           state.itemList= [...state.itemList, action.payload ]
        },
        fetchExpenses(state , action){
          state.itemList = [...action.payload];
        }

    }
})

export const itemsAction = itemListSlice.actions;
export default itemListSlice.reducer;