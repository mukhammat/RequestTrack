import express from 'express';
import cors from 'cors';

import router from './routers';
import { errorHanler } from '@middleware';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);

app.get('/check', (_req, res) => {
  res.status(404).json({ message: 'Check...' });
});
app.use(errorHanler);
app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' });
});

export default app;
