import React from 'react';
import './App.css';
import {Provider} from "react-redux";

import store from "./redux/store";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavigationMenu from "./components/navigationMenu";
import StocksPage from "./pages/stocks-page/stocks-page";
import BrokersPage from "./pages/brokers-page/brokers-page";
import StockHistoryPage from "./pages/stockHistory-page/stockHistory-page";
import SettingsPage from "./pages/settings-page/settings-page";
import {SocketProvider} from "./pages/socketContext";

const App: React.FC = () => {
    return(
        <Provider store={store}>
            <SocketProvider>
                <Router>
                    <NavigationMenu />
                    <Routes>
                        <Route path="/stocks" element={<StocksPage />}></Route>
                        <Route path="/brokers" element={<BrokersPage />}></Route>
                        <Route path="/stock-history/:label" element={<StockHistoryPage />} />
                        <Route path="/settings" element={<SettingsPage />}></Route>
                    </Routes>
                </Router>
            </SocketProvider>
        </Provider>
    )
}

export default App;
