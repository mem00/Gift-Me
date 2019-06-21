const express = require('express')
const itemRouter = express.Router()
const {Item,Wishlist} = require('../models');


itemRouter.get('/:item_id', async (req, res) => {
    const item = await Item.findByPk(req.params.item_id)
    res.json({
        item
    })
})

itemRouter.get('/wishlist/:wishlist_id', async (req, res) => {
    const items = await Item.findAll({
        where: {
            wishlistId: req.params.wishlist_id
        }
    })
    res.json({
        items
    })
})

itemRouter.post('/create/:wishlist_id', async (req, res) => {
    const wishlist = await Wishlist.findByPk(req.params.wishlist_id)
    const item = await Item.create(req.body)
    await item.setWishlist(wishlist)
    res.json({
        item
    })
})

itemRouter.put('/update/:item_id', async (req, res) => {
    const result = await Item.update(req.body, {
        where: {
            id: req.params.item_id
        }
    })
    res.json({
        result
    })
})

itemRouter.delete('/delete/:item_id', async (req, res) => {
    await Item.destroy({
        where: {
            id: req.params.item_id
        }
    })
    res.json(
        `Item with id ${req.params.item_id} has been deleted`
    )
})

module.exports = {
    itemRouter
}