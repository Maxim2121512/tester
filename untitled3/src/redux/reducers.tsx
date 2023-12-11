import {Stock} from "../interfaces/stock.interface";
import {Broker} from "../interfaces/broker.interface";
import {
    setBrokers,
    setStocks,
    deleteBroker,
    addBroker,
    updateBroker,
    toggleTrading,
    updateSettings,
    setAvailableStocks, setStartDate, setCurrentDate, setSpeed, setUsedStocks
} from "./actions";
import {createReducer} from "@reduxjs/toolkit";

import {SettingsState} from "../pages/settings-page/settingState.interface";


const initialStock: Stock[] = [];
const initialBrokers: Broker[] = [];

const initialSettings: SettingsState = {
    data: {
        startDate: '2021-12-10',
        currentDate: '2021-12-10',
        usedStocks: [],
        speed: '1',
    },
    tradingStarted: false,
}

const initialAvailableStocks: Stock[] = [];

const stocksReducer = createReducer(initialStock, (builder) => {
    builder.addCase(setStocks, (_, action) => action.payload);
})

const brokersReducer = createReducer(initialBrokers, (builder) => {
    builder
        .addCase(setBrokers, (_, action) => action.payload)
        .addCase(deleteBroker, (state, action) => {
            const userIdToDelete = action.payload;
            return state.filter((broker) => broker.userId !== userIdToDelete);
        })
        .addCase(addBroker, (state, action) => {
            return [...state, action.payload];
        })
        .addCase(updateBroker, (state, action) => {
            const updatedBroker = action.payload;
            return state.map((broker) =>
                broker.userId === updatedBroker.userId ? updatedBroker : broker
            );
        });
});


const settingsReducer = createReducer(initialSettings, (builder) => {
    builder
        .addCase(updateSettings, (_, action) => action.payload)
        .addCase(toggleTrading, (state) => {
            state.tradingStarted = !state.tradingStarted;
        })
        .addCase(setStartDate, (state, action) => {
            state.data.startDate = action.payload;
        })
        .addCase(setCurrentDate, (state, action) => {
            state.data.currentDate = action.payload;
        })
        .addCase(setSpeed, (state, action) => {
            state.data.speed = action.payload;
        })
        .addCase(setUsedStocks, (state, action) => {
            state.data.usedStocks = action.payload;
        })
})

const availableStocksReducer = createReducer(initialAvailableStocks, (builder) => {
    builder
        .addCase(setAvailableStocks, (_, action) => action.payload);
} )

export  {stocksReducer, brokersReducer, settingsReducer, availableStocksReducer};