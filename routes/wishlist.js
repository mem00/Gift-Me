const express = require('express');

const wishlistRouter = express.Router();

const {Wishlist, Person, Event, Item} = require('../models')

// iceCreamRouter.get('/:email', async (req,res)=>{

// })

module.exports = {
    wishlistRouter
}