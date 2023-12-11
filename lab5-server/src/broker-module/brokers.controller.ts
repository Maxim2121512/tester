import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { BrokersService } from './brokers.service';
import { Broker } from "./broker.interface";

@Controller('api/brokers')
export class BrokersController {
    constructor(private readonly brokerService: BrokersService) {}

    @Get('get/all')
    getAllBrokers(): Broker[] {
        return this.brokerService.getAllBrokers();
    }

    @Get('get/:userId')
    getBrokerById(@Param('userId') userId: string): Broker | undefined {
        return this.brokerService.getBrokerById(userId)
    }

    @Post('post/')
    addBroker(@Body() newBroker: Broker): Broker {
        return this.brokerService.addBroker(newBroker);
    }

    @Put('put/:userId')
    updateBrokerById(@Param('userId') userId: string, @Body() updatedBroker: Partial<Broker>): boolean {
        return this.brokerService.updateBrokerById(userId, updatedBroker);
    }

    @Delete('delete/:userId')
    deleteBrokerById(@Param('userId') userId: string): boolean {
        return this.brokerService.deleteBrokerById(userId);
    }
}
