import 'dotenv/config'
import express from 'express'
import UsersRoutes from './routes/UsersRoutes.js'
const app = express()
app.use(express.json())
app.use(UsersRoutes)
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT} `)
})