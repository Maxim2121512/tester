import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {Stock} from "../../interfaces/stock.interface";
import {setStocks} from "../../redux/actions";
import {getStocksFetch} from "./stocks-api";
import {Link} from "react-router-dom";
import {SettingsState} from "../settings-page/settingState.interface";

const StocksPage: React.FC = () => {
    const dispatch = useDispatch();
    const stocks = useSelector((state : {stocks: Stock[]}) => state.stocks);
    const tradingStarted = useSelector((state: { settings: SettingsState }) => state.settings.tradingStarted);

    useEffect(() => {
        if (!tradingStarted) {
            getStocksFetch()
                .then((stocks) => {
                    dispatch(setStocks(stocks));
                })
                .catch((error) => {
                    console.error('Error set stocks:', error.message);
                })
        }
    }, [dispatch]);

    return (
        <div style={{ margin: "20px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>Акции</h2>
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "10px",
                }}
            >
                <thead>
                <tr>
                    <th
                        style={{
                            backgroundColor: "#f2f2f2",
                            padding: "10px",
                            textAlign: "left",
                        }}
                    >
                        Название
                    </th>
                    <th
                        style={{
                            backgroundColor: "#f2f2f2",
                            padding: "10px",
                            textAlign: "left",
                        }}
                    >
                        Аббревиатура
                    </th>
                    <th
                        style={{
                            backgroundColor: "#f2f2f2",
                            padding: "10px",
                            textAlign: "left",
                        }}
                    >
                        Последняя цена
                    </th>
                    <th
                        style={{
                            backgroundColor: "#f2f2f2",
                            padding: "10px",
                            textAlign: "left",
                        }}
                    >
                        История
                    </th>
                </tr>
                </thead>
                <tbody>
                {stocks.map((stock) => (
                    <tr key={stock.label}>
                        <td style={{ padding: "10px" }}>{stock.name}</td>
                        <td style={{ padding: "10px" }}>{stock.label}</td>
                        <td style={{ padding: "10px" }}>{stock.price}</td>
                        <td style={{ padding: "10px" }}>
                            <Link
                                to={`/stock-history/${stock.label}`}
                                style={{
                                    textDecoration: "none",
                                    color: "#3498db",
                                    cursor: "pointer",
                                    transition: "color 0.3s ease",
                                }}
                            >
                                История
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default StocksPage;