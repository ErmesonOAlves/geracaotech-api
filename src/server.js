import 'dotenv/config'
import express from 'express'
import UsersRoutes from './routes/UsersRoutes.js'
import CategoryRoutes from './routes/CategoryRoutes.js'
const app = express()
app.use(express.json())
app.use(UsersRoutes)
app.use(CategoryRoutes)
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT} `)
})