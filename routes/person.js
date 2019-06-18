const express = require('express');

const personRouter = express.Router();

const {Wishlist, Person, Event, Item} = require('../models')

personRouter.get('/:email', async (req,res)=>{
    const person = await Person.findOne({
        where: {
            email: req.params.email
        } 
    })
    res.json({
        person
    })
})

personRouter.post('/create', async(req,res) => { 
    const person = await Person.create(req.body);
    res.json({
        person
    })
})


 
module.exports = {
    personRouter
}