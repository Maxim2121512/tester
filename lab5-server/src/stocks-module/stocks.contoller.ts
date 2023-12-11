import { Controller, Get, Param } from "@nestjs/common";
import {StocksService} from "./stocks.service";
import {Stock} from "./stock.interface";
import {StockSummary} from "./stockSummary.inerface";

@Controller('/api/stocks')
export class StocksController {
    constructor(private readonly stocksService: StocksService) {}

    @Get('get/all')
    getAllStocks(): Stock[] {
        return this.stocksService.getAllStocks();
    }

    @Get('get/summary')
    getStocksSummary(): StockSummary[] {
        return this.stocksService.getStocksSummary();
    }

    @Get('get/:label')
    getStockByLabel(@Param('label') label: string): Stock | undefined {
        return this.stocksService.getStockByLabel(label);
    }

    @Get('get/summary/:label')
    getStockSummaryByLabel(@Param('label') label: string): StockSummary | undefined {
        return this.stocksService.getStockSummaryByLabel(label);
    }

    @Get('get/:label/lastPrice')
    getLastPriceByLabel(@Param('label') label: string): string | undefined {
        return this.stocksService.getLastPriceByLabel(label);
    }
}