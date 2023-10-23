import ActiveAuctionList from "../services/ActiveAuctionList";
import React, {useEffect} from "react";
import replaceColorCode from "../minecraft/MinecraftColorCode";

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
}

const AuctionViewer: React.FC = () => {

    const [auctionList, setAuctionList] = React.useState<AuctionItem[]>([]);

    useEffect(() => {
        ActiveAuctionList().then((result) => {
            if (result) {
                result.forEach((auction: any) => {
                    //itemInfoを文字列からjsonに変換
                    auction.itemInfo = JSON.parse(auction.itemInfo);
                })
                setAuctionList(result);

                // result.forEach((auction: any) => {
                //     const parsedDisplayName = replaceColorCode(auction.itemInfo.displayName);
                //     const element = document.getElementById(auction.id.toString());
                //     console.log(element);
                //     if (element) {
                //         element.appendChild(parsedDisplayName);
                //     }
                // })
            }

        }).catch();
    }, []);

    return (
        <div>
            <h1>AuctionViewer</h1>
            <p>This is the AuctionViewer page</p>
            {auctionList.map((auction) => (
                <article key={auction.id} id={auction.id.toString()}>
                    <p>{auction.itemInfo.type}</p>
                    <p>{auction.itemInfo.amount}</p>
                </article>
            ))}
        </div>
    );
}

export default AuctionViewer;