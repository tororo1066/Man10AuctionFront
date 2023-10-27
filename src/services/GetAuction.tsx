
const GetAuction = async (auctionUuid: string) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/get-auction`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            auctionUuid: auctionUuid
        })
    });
    if (response.ok) {
        return await response.json();
    } else {
        return undefined;
    }
}

export default GetAuction;