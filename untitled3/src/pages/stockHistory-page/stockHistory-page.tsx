import {useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {StockHistoryData} from "./stockHistory.interface";
import {getHistoricalFetch} from "../stocks-page/stocks-api";
import Chart from "chart.js/auto"





const StockHistoryPage: React.FC = () => {
    const {label} = useParams();
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart>();

    const fetchStockHistory = async () => {
        try {
            const data = await getHistoricalFetch(label);
            drawChart(data);
        } catch (error: any) {
            console.error('Error fetching stock historical data:', error.message )
        }
    }

    const drawChart = (data: StockHistoryData[]) => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext("2d");

            if (ctx && data.length > 0) {
                const chartData = {
                    labels: data.map((item) => item.date),
                    datasets: [
                        {
                            label: label || "Цена открытия",
                            data: data.map((item) => parseFloat(item.open)),
                            fill: false,
                            borderColor: "rgba(75,192,192,1)",
                            backgroundColor: "rgb(0, 0, 0)",
                        },
                    ],
                };

                if (chartInstance.current) {
                    chartInstance.current.destroy(); // Уничтожаем предыдущий график, если он существует
                }

                chartInstance.current = new Chart(ctx, {
                    type: "line",
                    data: chartData,
                    options: {
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: "Дата",
                                },
                                reverse: true
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: "Цена открытия",
                                },
                            },
                        },
                    },
                });
            }
        }
    };

    useEffect(() => {
        fetchStockHistory();

        return () => {
            if (chartInstance.current) {
                chartInstance.current?.destroy();
            }
        }

    }, [label]);


    return (
        <div>
            <canvas  ref={chartRef}></canvas>
        </div>
    )
}

export default StockHistoryPage;