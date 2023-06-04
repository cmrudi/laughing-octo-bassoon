import axios from 'axios';
import { getIndex } from './path/to/your/module';

// Mocking the axios.get function
jest.mock('axios');

describe('getIndex', () => {
    it('should return the mid price from the API response', async () => {
        // Mocked response data
        const mockResponse = {
            data: {
                result: {
                    XBTUSDT: {
                        asks: [['27194.39', '8.37306']],
                        bids: [['27194.4', '4.06234']],
                    },
                },
            },
        };

        // Mocking the axios.get function to resolve with the mock response
        (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

        // Call the getIndex function
        const result = await getIndex();

        // Assert the expected mid price
        expect(result).toBe(27194.395);

        // Verify that axios.get was called with the correct URL
        expect(axios.get).toHaveBeenCalledWith(
            'https://api.kraken.com/0/public/Depth?pair=xbtusdt'
        );
    });

    it('should throw an error if the API request fails', async () => {
        // Mocking the axios.get function to reject with an error
        (axios.get as jest.Mock).mockRejectedValueOnce(new Error('API error'));

        // Call the getIndex function and expect it to throw an error
        await expect(getIndex()).rejects.toThrow('Failed to fetch order book');
    });
});