const express = require('express');

const wishlistRouter = express.Router();

const {Wishlist, Person, Event, Item} = require('../models')


wishlistRouter.get('/email/:email', async (req,res)=>{
    const personWishlistsAndItems = await Person.findOne({
        where: {
            email: req.params.email
        },
        include: [{ 
            model: Wishlist,
            include: [Item]       
        }]  
    })
    const personWishlistsAndEvents = await Person.findOne({
        where: {
            email: req.params.email
        },
        include: [{ 
            model: Wishlist,
            include: [Event]       
        }]  
    })
    res.json({
        personWishlistsAndItems,
        personWishlistsAndEvents
    })
})

wishlistRouter.post('/create/:person_id', async(req,res) => {
    const person = await Person.findByPk(req.params.person_id); 
    const wishlist = await Wishlist.create(req.body);
    await wishlist.setPerson(person);
    res.json({
        wishlist
    })
})

wishlistRouter.put('/edit/:wishlist_id', async(req,res)=>{
    const wishlist = await Wishlist.update(req.body,{
        where: {
            id: req.params.wishlist_id
        }
    })
    res.json({
        wishlist
    })
})

wishlistRouter.delete('/delete/:wishlist_id', async(req,res)=>{
   const wishlist = await Wishlist.findByPk(req.params.wishlist_id);
   wishlist.destroy();
   res.json(
       {msg: `wishlist with id ${req.params.wishlist_id} destroyed!`}
   );
})
 
module.exports = {
    wishlistRouter
}