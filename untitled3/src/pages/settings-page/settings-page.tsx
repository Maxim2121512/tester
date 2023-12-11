import React, {useEffect, useState} from "react";
import { getSettings, setSettings } from "./settings-api";
import {getStocksFetch} from "../stocks-page/stocks-api";

import {useSelector, useDispatch} from "react-redux";
import {Stock} from "../../interfaces/stock.interface";
import {
    updateSettings,
    toggleTrading,
    setAvailableStocks,
    setStocks,
    setUsedStocks,
    setStartDate, setCurrentDate, setSpeed
} from "../../redux/actions";
import {SettingsState} from "./settingState.interface";
import {useSocket} from "../socketContext";

interface NewStocks {
    label: string,
    price: string
}

const SettingsPage: React.FC = () => {
    const socket = useSocket();
    const stocks = useSelector((state : {stocks: Stock[]}) => state.stocks);
    const availableStocks = useSelector((state : {availableStocks: Stock[]}) => state.availableStocks);
    const settings = useSelector((state: {settings: SettingsState}) => state.settings.data);
    const tradingStarted = useSelector((state: { settings: SettingsState }) => state.settings.tradingStarted);
    const dispatch = useDispatch();

    const updateDateHandler = (date: string) => {
        dispatch(setCurrentDate(date));
    }

    const updatePricesHandler = (newStocks: NewStocks[]) => {
        let stocksCopy = [...stocks];

        newStocks.forEach(newStock => {
            let index = stocksCopy.findIndex(stock => stock.label === newStock.label);
            if (index !== -1) {
                stocksCopy[index] = {
                    ...stocksCopy[index],
                    price: newStock.price,
                };
            }
        });

        dispatch(setStocks(stocksCopy));
    }
    
    useEffect(() => {
        if (!tradingStarted) {
            getStocksFetch()
                .then((stocks) => {
                    dispatch(setAvailableStocks(stocks));
                })
                .catch((error) => {
                    console.error("Error fetching available stocks:", error.message);
                });


            getSettings()
                .then((fetchedSettings) => dispatch(updateSettings(fetchedSettings)))
                .catch((error) => {
                    console.error("Error fetching settings:", error.message);
                });
        }
    }, [dispatch]);

    useEffect(() => {
        socket?.on('updateDate', updateDateHandler);
    }, [updateDateHandler]);

    useEffect(() => {
        socket?.on('updatePrices', updatePricesHandler);
    }, [updatePricesHandler]);


    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!tradingStarted) {
            const newDate = e.target.value;
            dispatch(setStartDate(newDate))
        }
    }

    const handleCurrentDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!tradingStarted) {
            const newDate = e.target.value;
            dispatch(setCurrentDate(newDate))
        }
    }

    const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!tradingStarted) {
            const newSpeed = e.target.value;
            dispatch(setSpeed(newSpeed));
        }
    }

    const handleStockChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!tradingStarted) {
            const selectedStocks = Array.from(e.target.selectedOptions, (option) => option.value);

            dispatch(setUsedStocks(selectedStocks));

        }
    };

    const handleSave = () => {
        if (!tradingStarted) {


            setSettings(settings)
                .then((updatedSettings) => {
                    console.log("Settings saved:", updatedSettings);
                    dispatch(toggleTrading());
                    socket?.open();
                    socket?.emit('updateDate');
                    socket?.emit('updatePrices');
                })
                .catch((error) => {
                    console.error("Error saving settings:", error.message);
                });

        } else {
            socket?.emit('stop');
            socket?.close();
            dispatch(toggleTrading());
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2 style={{ color: '#333' }}>Настройки</h2>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                    Начальная дата:
                    <input
                        type="date"
                        name="startDate"
                        disabled={tradingStarted}
                        value={settings.startDate}
                        onChange={(e) => handleStartDateChange(e)}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </label>
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                    Текущая дата:
                    <input
                        type="date"
                        name="currentDate"
                        disabled={tradingStarted}
                        value={settings.currentDate}
                        onChange={(e) => handleCurrentDateChange(e)}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </label>
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                    Скорость:
                    <input
                        disabled={tradingStarted}
                        type="number"
                        name="speed"
                        value={settings.speed}
                        onChange={(e) => handleSpeedChange(e)}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </label>
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                    Используемые акции:
                    <select
                        multiple
                        disabled={tradingStarted}
                        name="usedStocks"
                        value={settings.usedStocks}
                        onChange={handleStockChange}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    >
                        {/* Заполни опции доступными акциями */}
                        {availableStocks.map((stock) => (
                            <option key={stock.label} value={stock.label}>
                                {stock.label}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div style={{ marginBottom: '15px' }}>
                <button
                    onClick={handleSave}
                    style={{
                        backgroundColor: '#4caf50',
                        color: 'white',
                        padding: '10px 15px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        border: 'none',
                        borderRadius: '4px',
                    }}
                >
                    {tradingStarted ? 'Остановить торги' : 'Начать торги'}
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
