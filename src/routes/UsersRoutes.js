import express from 'express';
const router = express.Router();


import {getById,create,update} from '../controllers/UserController.js'
router.get('/v1/user/:id', getById);
router.post('/v1/user', create);
router.put('/v1/user/:id', update);

export default router;