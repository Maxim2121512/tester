import { Injectable, OnModuleInit } from "@nestjs/common";
import {Broker} from "./broker.interface";
import * as fs from 'fs';
import * as path from "path";

@Injectable()
export class BrokersService implements OnModuleInit {
    private readonly brokersFilePath = './src/data/brokers.json';
    private brokers: Broker[] = []

    public onModuleInit(): void {
        this.load();
    }

    private load(): void {
        try{
            const content = fs.readFileSync(path.join(__dirname, '..', '..', this.brokersFilePath), 'utf-8');
            this.brokers = JSON.parse(content) as Broker[];
            console.log(this.brokers);
        } catch (error) {
            console.error('Error loading users:', error.message);
        }
    }

    private save(): void {
        try {
            fs.writeFileSync(this.brokersFilePath, JSON.stringify(this.brokers, null, 2), 'utf-8');
        } catch (error) {
            console.error('Error saving users:', error.message);
        }
    }

    public getAllBrokers(): Broker[] {
        return this.brokers;
    }

    public getBrokerById(userId: string): Broker | undefined {
        return this.brokers.find(broker => broker.userId === userId );
    }

    public updateBrokerById(userId: string, updatedBroker: Partial<Broker>): boolean {
        const index = this.brokers.findIndex(broker => broker.userId === userId);

        if (index !== -1) {
            this.brokers[index] = {...this.brokers[index], ...updatedBroker};
            this.save();
            return true;
        }

        return false;
    }

    public deleteBrokerById(userId: string): boolean {
        const index = this.brokers.findIndex(broker => broker.userId === userId);

        if (index !== -1) {
            this.brokers.splice(index, 1)
            this.save();
            return true;
        }

        return false;
    }

    public addBroker(newBroker: Broker): Broker {
        let userId: string = '1';

        if (this.brokers.length > 0) {
            const lastId: number = parseInt(this.brokers[this.brokers.length - 1].userId);
            userId = (lastId + 1).toString();
        }


        const brokerToAdd: Broker = {
            userId: userId,
            username: newBroker.username,
            cash: newBroker.cash
        };

        this.brokers.push(brokerToAdd);

        this.save();

        return brokerToAdd;
    }

}