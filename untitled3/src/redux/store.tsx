import { configureStore} from "@reduxjs/toolkit";
import {stocksReducer, brokersReducer, settingsReducer, availableStocksReducer} from "./reducers";

const store = configureStore({
    reducer: {
        stocks: stocksReducer,
        availableStocks: availableStocksReducer,
        brokers: brokersReducer,
        settings: settingsReducer
    },
});

export default store;
