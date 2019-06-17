const express = require('express');

const eventRouter = express.Router();

const {Wishlist, Person, Event, Item} = require('../models')

eventRouter.get('/:name', async (req,res)=>{
    const event= await Event.findOne({
        where: {
            name: req.params.name
        }
      
    })

    res.json({event})
})

eventRouter.post('/create/:id', async(req, res)=>{
    const wishlist = await Wishlist.findByPk(req.params.id)
    const event = await Event.create(req.body);
    await event.setWishlist(wishlist)
    res.json({
        event
    })
})


 
module.exports = {
    eventRouter
}