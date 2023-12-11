import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrokersController } from "./broker-module/brokers.controller";
import { StocksController } from "./stocks-module/stocks.contoller";
import { SettingsController } from "./settings-module/settings.controller";
import { BrokerPurchasesController } from "./brokerPurchases-module/brokerPurchases.controller";
import { MarketController } from "./market/market.controller";
import { BrokersService } from "./broker-module/brokers.service";
import { StocksService } from "./stocks-module/stocks.service";
import { SettingsService } from "./settings-module/settings.service";
import { BrokerPurchasesService } from "./brokerPurchases-module/brokerPurchases.service";
import { MarketService } from "./market/market.service";
import { WebsocketService } from "./websocket-module/websocket.service";

@Module({
    controllers: [AppController,
        BrokersController,
        StocksController,
        SettingsController,
        BrokerPurchasesController,
        MarketController],
    providers: [AppService,
        BrokersService,
        StocksService,
        SettingsService,
        BrokerPurchasesService,
        MarketService,
        WebsocketService],
})
export class AppModule {}
