const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors')

const {wishlistRouter} = require('./routes/wishlist')
const {itemRouter} = require('./routes/item')


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
app.use('/item', itemRouter)


app.listen(PORT, ()=> console.log(`App listening on port ${PORT}`))