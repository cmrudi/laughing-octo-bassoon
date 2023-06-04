import axios from 'axios';

export async function getIndex(): Promise<any> {
    try {
        const response = await axios.get(
            'https://api.huobi.pro/market/depth?symbol=btcusdt&type=step0'
        );

        const bids = response.data.tick.bids;
        const asks = response.data.tick.asks;
        return (parseFloat(bids[0][0]) + parseFloat(asks[0][0])) / 2;
    } catch (error) {
        throw new Error('Failed to fetch order book');
    }
}