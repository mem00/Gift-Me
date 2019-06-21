const express = require('express');
const eventRouter = express.Router();
const {Wishlist, Event} = require('../models')

eventRouter.get('/:event_id', async (req, res) => {
    const event = await Event.findByPk(req.params.event_id)
    res.json({
        event
    })
})

eventRouter.get('/wishlist/:wishlist_id', async (req, res) => {
    const events = await Event.findAll({
        where: {
            wishlistId: req.params.wishlist_id
        }
    })
    res.json({
        events
    })
})

eventRouter.post('/create/:wishlist_id', async (req, res) => {
    const wishlist = await Wishlist.findByPk(req.params.wishlist_id)
    const event = await Event.create(req.body);
    await event.setWishlist(wishlist)
    res.json({
        event
    })
})

eventRouter.put('/update/:event_id', async (req, res) => {
    const event = await Event.update(req.body, {
        where: {
            id: req.params.event_id
        }
    })
    res.json({
        event
    })
})

eventRouter.delete('/delete/:event_id', async (req, res) => {
    await Event.destroy({
        where: {
            id: req.params.event_id
        }
    })
    res.json({
        message: "deleted",
        data: req.params.event_id
    })
})

module.exports = {
    eventRouter
}