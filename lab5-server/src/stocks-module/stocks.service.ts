import { Injectable, OnModuleInit } from "@nestjs/common";
import {Stock} from "./stock.interface";
import {StockSummary} from "./stockSummary.inerface";
import * as fs from 'fs';
import * as path from "path";

@Injectable()
export class StocksService implements OnModuleInit{
    private readonly stocksRelativeFilePath = './src/data/stocks/';
    private stocksData: Stock[] = [];

    public onModuleInit(): void {
        this.load();
    }

    private load(): void {
        try {
            const stocksFilePath: string =  path.join(__dirname, '..', '..', this.stocksRelativeFilePath)
            const stocks: string[] = fs.readdirSync(stocksFilePath);

            console.log(stocks);

            for (const stock of stocks) {
                const stockPath: string = path.join(stocksFilePath, stock);
                const content: string = fs.readFileSync(stockPath, 'utf-8');
                const parsedContent: Stock = JSON.parse(content);
                this.stocksData.push(parsedContent);
            }
        } catch (error) {
            console.error('Error loading stocks:', error.message);
        }

    }

    public getAllStocks(): Stock[] {
        return this.stocksData;
    }

    public getStocksSummary(): StockSummary[] {
        let stocksSummary: StockSummary[] = [];
        this.stocksData.forEach(stock => {
            stocksSummary.push({
                name: stock.name,
                label: stock.label,
                price: stock.data[0].open
            });
        });

        return stocksSummary;
    }

    public getStockByLabel(label: string): Stock | undefined {
        return this.stocksData.find(stock => stock.label === label);
    }

    public getLastPriceByLabel(label: string): string | undefined {
        const stock = this.stocksData.find(stock => stock.label === label);

        if (stock) {
            return stock.data[0].open;
        }

        return undefined;
    }

    public getStockSummaryByLabel(label: string): StockSummary | undefined {
        const stock = this.stocksData.find(stock => stock.label === label);

        if (stock) {
            const lastPrice = stock.data[0].open;
            return {
                name: stock.name,
                label: stock.label,
                price: lastPrice
            }
        }

        return undefined;
    }

    public getNextDate(targetDate: string) {
        const stock = this.stocksData[0];

        const index = stock.data.findIndex(item => item.date === targetDate);

        return index === 0 ? targetDate : stock.data[index - 1].date;
    }

}