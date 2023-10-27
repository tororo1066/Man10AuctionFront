
const Bid = async (auctionUuid: string, price: number, token: string) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/bid`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            auctionUuid: auctionUuid,
            price: price,
            token: token
        })
    });

    if (response.ok) {
        return "success";
    } else {
        return response.text()
    }
}

export default Bid;