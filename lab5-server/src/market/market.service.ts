import { Injectable } from "@nestjs/common";
import { SettingsService } from "../settings-module/settings.service";
import { StocksService } from "../stocks-module/stocks.service";
import { StockSummary } from "../stocks-module/stockSummary.inerface";
import { StockPrice } from "./stockPrice.interface";

@Injectable()
export class MarketService {
    constructor(
        public settings: SettingsService,
        public stocks: StocksService
    ) {}

    private formatDateToSlashFormat(date: string) {
        const [year, month, day] = date.split('-');
        return `${month}/${day}/${year}`;
    }

    private formatDateToDashFormat(date: string) {
        const [month, day, year] = date.split("/");
        console.log(month, day, year)
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }

    public updateDate() {
        const currentDate = this.formatDateToSlashFormat(this.settings.getSettings().currentDate);
        const nextDate = this.formatDateToDashFormat(this.stocks.getNextDate(currentDate))
        this.settings.setNextDate(nextDate);

        return nextDate;
    }

    public updatePrices(): StockPrice[] {
        const stockLabels = this.settings.getSettings().usedStocks;
        const currentDate = this.formatDateToSlashFormat(this.settings.getSettings().currentDate);
        const prices: StockPrice[] = [];

        stockLabels.forEach( (label) => {
            const stock = this.stocks.getAllStocks().find(stock => stock.label === label);
            const index = stock.data.findIndex(item => item.date === currentDate);
            const price = stock.data[index].open;
            prices.push({
                label: label,
                price: price
            })
        })

        console.log(prices);
        return prices;
    }

    public isStartTimeValid(): boolean {
        const startDate =  this.formatDateToSlashFormat(this.settings.getSettings().startDate);
        const stock = this.stocks.getAllStocks()[0];
        console.log(startDate)
        const index = stock.data.findIndex(item => item.date === startDate)

        return index !== -1;
    }
}