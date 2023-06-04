import axios from 'axios';

export async function getIndex(): Promise<any> {
    try {

        const response = await axios.get(
            'https://api.kraken.com/0/public/Depth?pair=xbtusdt'
        );

        const result = response.data.result;
        const orderBook = result.XBTUSDT;

        const asks = orderBook.asks.map((ask: string[]) => [
            ask[0],
            ask[1]
        ]);
        const bids = orderBook.bids.map((bid: string[]) => [
            bid[0],
            bid[1]
        ]);

        const midPrice = (parseFloat(asks[0][0]) + parseFloat(bids[0][0])) / 2;
        return midPrice;
    } catch (error) {
        throw new Error('Failed to fetch order book');
    }
}