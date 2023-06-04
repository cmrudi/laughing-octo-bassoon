import axios from 'axios';

export async function getIndex(): Promise<any> {
    try {
        const response = await axios.get(
            'https://api.binance.com/api/v3/depth?limit=10&symbol=BTCUSDT'
        );

        const asks = response.data.asks.map((ask: string[]) => [
            parseFloat(ask[0]),
            parseFloat(ask[1])
        ]);
        const bids = response.data.bids.map((bid: string[]) => [
            parseFloat(bid[0]),
            parseFloat(bid[1])
        ]);

        const midPrice = (asks[0][0] + bids[0][0]) / 2;
        return midPrice;
    } catch (error) {
        throw new Error('Failed to fetch order book');
    }
}