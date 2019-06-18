const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors')
const {wishlistRouter} = require('./routes/wishlist')
const {eventRouter} = require('./routes/event')
const {itemRouter} = require('./routes/item')
const {personRouter} = require('./routes/person')

const PORT = process.env.PORT || 4567;
const app = express();

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use((err, req, res, next)=>{
    console.warn(err.stack);
    res.status(500).json({
        message: err.message
    })
})

app.get('/', async(req,res)=>{
    res.json("Welcome to Wishlist")
})

app.use('/wishlist', wishlistRouter)

app.use('/event', eventRouter)

app.use('/item', itemRouter)

app.use('/person', personRouter)


app.listen(PORT, ()=> console.log(`App listening on port ${PORT}`))