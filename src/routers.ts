import { Router } from 'express';

const router = Router();

import b from './bootstrap'; // bootstrap

router.use('/request', b.createRequest());

export default router;
