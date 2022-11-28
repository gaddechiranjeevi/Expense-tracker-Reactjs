import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./Auth";
import itemsListReducer from "./FetchData";
import  premiumReducer  from "./PremiumBtn";
import paginationReducer from "./pagination";

const store = configureStore({
    reducer: {
        auth: authReducer,
        itemsData: itemsListReducer,
        premium: premiumReducer,
        darkMode: darkModeReducer,
        pagination: paginationReducer,
    },
});

export default store;