import { Controller, Get } from "@nestjs/common";
import { MarketService } from "./market.service";


@Controller('api/market')
export class MarketController {

    constructor(private readonly marketService: MarketService) {}

    @Get('isValidStartTime/')
    isStartTimeValid(): boolean {
        return this.marketService.isStartTimeValid();
    }
}