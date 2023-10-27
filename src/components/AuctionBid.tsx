import React from "react";
import MinecraftText from "../minecraft/MinecraftText";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import AuctionItem from "../data/AuctionItem";
import Bid from "../services/Bid";
import {AuthInfoContext} from "../system/AuthSystem";

const AuctionBid: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [authInfo] = React.useContext(AuthInfoContext);
    const auctionData = location.state as AuctionItem | null;
    let price = 0;

    if (!auctionData) {
        return <Navigate to="/auction" />;
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const token = authInfo.token;
        if (!token) {
            navigate("/login")
            return;
        }
        Bid(auctionData.auctionUuid, price, token).then((result) => {
            if (result === "success") {
                navigate("/auction");
            } else {
                alert(`入札に失敗しました ${result}`);
            }
        }).catch();
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        price = Number(value);
    }

    return (
        <div>
            {auctionData ? (
                <div>
                    <h1>{auctionData.itemInfo.displayName === "" ?
                        auctionData.materialName :
                        MinecraftText(auctionData.itemInfo.displayName)}に入札する</h1>
                    <p>現在の価格: {auctionData.nowPrice}円</p>
                    <p>入札する金額を入力してください</p>
                    <form onSubmit={handleSubmit}>
                        <input type="number" onChange={handleInputChange}/>
                        <input type="submit" value="入札"/>
                    </form>
                </div>
            ) : <p>オークションが見つかりませんでした</p>}

        </div>
    );
}

export default AuctionBid;