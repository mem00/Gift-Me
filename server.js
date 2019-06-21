const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors')
const path = require('path');
const {wishlistRouter} = require('./routes/wishlist')
const {eventRouter} = require('./routes/event')
const {itemRouter} = require('./routes/item')
const {personRouter} = require('./routes/person')

const PORT = process.env.PORT || 4567;
const app = express();

// Static hosting for built files
// app.use(express.static(path.join(__dirname, './client/build')));

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use((err, req, res, next) => {
    console.warn(err.stack);
    res.status(500).json({
        message: err.message
    })
})

app.get('/', async (req, res) => {
    res.json("Welcome to Wishlist")
})

app.use('/wishlist', wishlistRouter)

app.use('/event', eventRouter)

app.use('/item', itemRouter)

app.use('/person', personRouter)


// In production, any request that doesn't match a previous route
// should send the front-end application, which will handle the route.
// if (process.env.NODE_ENV == "production") {
//     app.use('*', (req, res) => res.sendFile(path.join(__dirname, './client/build', "index.html")));
//     }


app.listen(PORT, () => console.log(`App listening on port ${PORT}`))