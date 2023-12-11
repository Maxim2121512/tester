import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { MarketService } from "../market/market.service";

@WebSocketGateway(5001, { transports: ['websocket'] })
export class WebsocketService implements OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer() server: Server;
    private dateUpdater: any;
    private pricesUpdater: any;
    constructor(
        private markerService: MarketService
    ) {}

    public handleConnection(client: Socket, ...args: any[]): void {
        console.log(`Client connected: ${client.id}`);
    }

    public handleDisconnect(client: Socket): void {
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('updateDate')
    updateDate() {
        this.dateUpdater = setInterval(() => {
            this.server.emit('updateDate', this.markerService.updateDate());
        },  1000 * parseInt(this.markerService.settings.getSettings().speed));

    }

    @SubscribeMessage('updatePrices')
    updatePrices() {
        this.pricesUpdater = setInterval(() => {
            this.server.emit('updatePrices', this.markerService.updatePrices());
        }, 1000 * parseInt(this.markerService.settings.getSettings().speed))
    }

    @SubscribeMessage('stop')
    stop() {
        console.log('stop');
        clearInterval(this.dateUpdater);
        clearInterval(this.pricesUpdater);
    }

}