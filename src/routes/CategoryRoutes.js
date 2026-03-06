import {getById,create,search,update,remove} from '../controllers/CategoryController.js'
import express from 'express'
 const router = express.Router();

router.get('/v1/category/search',search)
router.get('/v1/category/:id',getById)
router.post('/v1/category', create)
router.put('/v1/category/:id',update)
router.delete('/v1/category/:id',remove)


export default router

