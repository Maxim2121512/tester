import { Module } from "@nestjs/common";
import { BrokerPurchasesController } from "./brokerPurchases.controller";
import { BrokerPurchasesService } from "./brokerPurchases.service";


@Module({
    controllers: [BrokerPurchasesController],
    providers: [BrokerPurchasesService]
})
export class BrokerPurchasesModule {}