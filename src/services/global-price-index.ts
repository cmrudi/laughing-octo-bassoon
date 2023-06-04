import { getIndex as binanceWsIndex } from '../externals/binance-ws';
import { getIndex as krakenIndex } from '../externals/kraken';
import { getIndex as huobiIndex } from '../externals/huobi';

export async function getGlobalIndex(): Promise<any> {
    try {
        const binanceIdx = await binanceWsIndex();
        const krakenIdx = await krakenIndex();
        const huobiIdx = await huobiIndex();
        console.log("binanceIdx", binanceIdx);
        console.log("krakenIdx", krakenIdx);
        console.log("huobiIdx", huobiIdx);
        return (binanceIdx + krakenIdx + huobiIdx) / 3;
    } catch (error) {
        throw new Error('Failed to fetch order book');
    }
}