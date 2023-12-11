import {Stock} from "../interfaces/stock.interface";
import {Broker} from "../interfaces/broker.interface";
import {createAction} from "@reduxjs/toolkit";
import exp from "constants";
import {SettingsState} from "../pages/settings-page/settingState.interface";

export const setStocks = createAction<Stock[]>('SET_STOCK')
export const setBrokers = createAction<Broker[]>('SET_BROKERS');
export const deleteBroker = createAction<string>("DELETE_BROKER"); // Примечание: я предполагаю, что 'userId' имеет тип string
export const addBroker = createAction<Broker>("ADD_BROKER");
export const updateBroker = createAction<Broker>("UPDATE_BROKER");

export const updateSettings = createAction<SettingsState>('UPDATE_SETTINGS');
export const toggleTrading = createAction('TOGGLE_TRADING');

export const setAvailableStocks = createAction<Stock[]>('SET_AVAILABLE_STOCKS');
export const setStartDate = createAction<string>('SET_START_DATE');
export const setCurrentDate = createAction<string>('SET_CURRENT_DATE');
export const setUsedStocks = createAction<string[]>('SET_USED_STOCKS');

export const setSpeed =  createAction<string>('SET_SPEED');