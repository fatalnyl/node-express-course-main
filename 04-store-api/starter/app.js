require('dotenv').config()
//async errors
require('express-async-errors')

const express = require('express')
const app = express()
const connectDB = require('./db/connect')

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddlware = require('./middleware/error-handler')
const productsRouter = require('./routes/products')
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products', productsRouter)
// products route

app.use(notFoundMiddleware)
app.use(errorMiddlware)

const PORT = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`Server is listening port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()