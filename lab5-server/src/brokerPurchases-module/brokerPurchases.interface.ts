
export interface BrokersPurchases{
    [userId: string]: BrokerPurchases
}

export interface BrokerPurchases {
    [stockLabel: string]: Purchases;
}

export interface Purchases {
    totalCount: string;
    lossProfit: string;
    purchases: Purchase[];
}

interface Purchase {
    date: string;
    price: string;
    count: string;
}