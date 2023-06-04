import express, { Request, Response } from 'express';
import { getGlobalIndex } from './src/services/global-price-index';

const app = express();

app.get('/global-index', async (req: Request, res: Response) => {
    try {
        const globalIndex = await getGlobalIndex();
        res.json(globalIndex);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch global index'});
    }
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

