const express = require('express');

const wishlistRouter = express.Router();

const {Wishlist, Person, Event, Item} = require('../models')

wishlistRouter.get('/:email', async (req,res)=>{
    const person = await Person.findOne({
        where: {
            email: req.params.email
        },
        include: [{ 
            model: Wishlist,
            include: [Item]       
        }]
    })

    res.json({person})
})

wishlistRouter.post('/create/:person_id', async(req,res) => {
    const person = await Person.findByPk(req.params.person_id); 
    const wishlist = await Wishlist.create(req.body);
    await wishlist.setPerson(person);
    res.json(wishlist)
})
 
module.exports = {
    wishlistRouter
}