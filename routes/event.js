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

eventRouter.put('/edit/:id', async(req, res)=>{
    const event = await Event.update(req.body, {
        where: {
            id: req.params.id
        }  
    })
    res.json({
        event
    })
})

eventRouter.delete('/edit/:id', async (req, res) => {
    let deleteEvent = await Event.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json({
      message: "deleted",
      data: req.params
  })
  })
 
module.exports = {
    eventRouter
}