import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./Auth";
import itemsListReducer from "./FetchData";
import  premiumReducer  from "./PremiumBtn";

const store = configureStore({
    reducer: { auth:authReducer,
        itemsData:itemsListReducer,
        premium:premiumReducer,

    },
});

export default store;