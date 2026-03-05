import express from 'express';
const router = express.Router();


import {getById,create} from '../controllers/UserController.js'
router.get('/user/:id', getById);
router.post('/user', create);

export default router;