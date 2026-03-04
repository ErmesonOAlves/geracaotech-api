import express from 'express';
const router = express.Router();


import {getById} from '../controllers/UsersController.js'
router.get('/users/:id', getById);

export default router;