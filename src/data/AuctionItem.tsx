interface AuctionItem {
    id: number;
    auctionUuid: string;
    sellerUuid: string;
    sellerName: string;
    item: string;
    startDate: Date;
    activateDay: number;
    endDate: Date | null;
    nowPrice: number;
    defaultPrice: number;
    isEnd: boolean;
    isReceived: boolean;
    lastBidUuid: string | null;
    lastBidName: string | null;
    splitMoney: number;
    delayMinute: number;
    itemInfo: {
        displayName: string;
        lore: string[];
        type: string;
        amount: number;
        enchantments: {
            [key: string]: {
                level: number;
            }
        }
    }

    materialName: string;
}

export default AuctionItem;