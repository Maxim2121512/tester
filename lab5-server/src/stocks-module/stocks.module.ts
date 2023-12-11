import { Module } from "@nestjs/common";
import { StocksController } from "./stocks.contoller";
import { StocksService } from "./stocks.service";


@Module({
    controllers: [StocksController],
    providers: [StocksService]
})
export class StocksModule {}