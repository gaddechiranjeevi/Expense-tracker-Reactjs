import { createSlice } from "@reduxjs/toolkit";

const btnInitialState = {
    isPremium: false
}

const PremiumBtn = createSlice({
    name: 'PremiumButton',
    initialState:btnInitialState,
    reducers: {
        PremiumBtnActive(state){
            state.isPremium = true;
        },
        PremiumBtnDeactive(state){
            state.isPremium = false
        }
    }
})

export const premiumActions = PremiumBtn.actions;

export default PremiumBtn.reducer;