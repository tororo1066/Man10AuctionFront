import ActiveAuctionList from "../services/ActiveAuctionList";
import React, {useEffect} from "react";
import MinecraftText from "../minecraft/MinecraftText";
import AuctionItem from "../data/AuctionItem";
import {useNavigate} from "react-router-dom";
import moment from "moment";

const AuctionViewer: React.FC = () => {

    const navigate = useNavigate();
    const [auctionList, setAuctionList] = React.useState<AuctionItem[]>([]);

    useEffect(() => {
        ActiveAuctionList().then((result) => {
            if (result) {
                result.forEach((auction: any) => {
                    //itemInfoを文字列からjsonに変換
                    auction.itemInfo = JSON.parse(auction.itemInfo);
                })
                setAuctionList(result);
            }

        }).catch();
    }, []);

    function onAuctionClick(auction: AuctionItem) {
        navigate("/auction/bid", { state: auction });
    }

    return (
        <div>
            <h1>AuctionViewer</h1>
            <p>This is the AuctionViewer page</p>
            {auctionList.map((auction) => (
                <article className="article" key={auction.id} onClick={() => onAuctionClick(auction)}>
                    {auction.itemInfo.displayName === "" ?
                        auction.materialName :
                        MinecraftText(auction.itemInfo.displayName)}
                    <p>{auction.nowPrice}円</p>
                    <p>{moment(auction.startDate)
                        .add(auction.activateDay, "days")
                        .add(auction.delayMinute, "minutes")
                        .format("YYYY/MM/DD HH:mm:ss")}まで</p>
                </article>
            ))}
        </div>
    );
}

export default AuctionViewer;