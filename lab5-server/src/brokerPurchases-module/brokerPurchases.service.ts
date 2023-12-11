import { Injectable, OnModuleInit } from "@nestjs/common";
import { BrokerPurchases, BrokersPurchases, Purchases } from "./brokerPurchases.interface";
import * as fs from 'fs';
import * as path from "path";


@Injectable()
export class BrokerPurchasesService implements OnModuleInit {
    private readonly brokersPurchasesFilePath = './src/data/purchases.json';
    private brokersPurchases: BrokersPurchases = {} as BrokersPurchases;

    public onModuleInit(): void {
        this.load()
    }

    private load(): void {
        try {
            const content = fs.readFileSync(path.join(__dirname, '..', '..', this.brokersPurchasesFilePath), 'utf-8');
            this.brokersPurchases = JSON.parse(content) as BrokersPurchases;
            console.log(this.brokersPurchases);
        } catch (error) {
            console.error('Error loading brokers purchases:', error.message);
        }
    }

    public getAllPurchasesById(userId: string): BrokerPurchases | undefined {
        return this.brokersPurchases[userId];
    }

    public getStockPurchasesById(userId: string, label: string): Purchases | undefined {
        const userPurchases: BrokerPurchases | undefined = this.brokersPurchases[userId];
        if (userPurchases) {
            const purchases: Purchases | undefined = userPurchases[label];

            if (purchases) {
                return purchases;
            } else {
                return {} as Purchases;
            }

        }
        return undefined;
    }

}