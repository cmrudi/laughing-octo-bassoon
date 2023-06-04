import WebSocket from 'ws';

interface OrderBookData {
    bids: [string, string][];
    asks: [string, string][];
}

let orderBookData: OrderBookData = {
    bids: [],
    asks: []
};

export function getIndex(): number {
    const bids = orderBookData.bids;
    const asks = orderBookData.asks;

    if (bids.length > 0 && asks.length > 0) {
        const bidPrice = parseFloat(bids[0][0]);
        const askPrice = parseFloat(asks[0][0]);
        return (bidPrice + askPrice) / 2;
    }

    return 0;
}

const symbol = 'btcusdt';

// Create a WebSocket connection to the Binance WebSocket API
const ws = new WebSocket('wss://stream.binance.com:9443/ws');

ws.on('open', () => {
    // Subscribe to the order book updates for the specified symbol
    ws.send(JSON.stringify({
        method: 'SUBSCRIBE',
        params: [
            `${symbol.toLowerCase()}@depth`
        ],
        id: 1
    }));
});

ws.on('message', (data) => {
    const message = JSON.parse(data.toString());
    console.log("message", message);

    if (message.e === 'depthUpdate' && message.s === "BTCUSDT") {
        const bids = message.b.map((item: [string, string]) => [item[0], item[1]]);
        const asks = message.a.map((item: [string, string]) => [item[0], item[1]]);

        // Update the order book data
        orderBookData = { bids, asks };
        console.log("orderBookData", orderBookData);
    }
});

ws.on('close', () => {
    console.log('WebSocket connection closed');
});