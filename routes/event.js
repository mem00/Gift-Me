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

eventRouter.post('/create', async(req, res)=>{
    const event = await Event.create(req.body);
    res.json({
        event
    })
})


 
module.exports = {
    eventRouter
}