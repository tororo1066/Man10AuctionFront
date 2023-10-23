
const ActiveAuctionList = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/active-auction-list`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        return await response.json();
    } else {
        return undefined;
    }
}

export default ActiveAuctionList;