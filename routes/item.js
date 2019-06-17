const express = require('express')

const itemRouter= express.Router()
const { Item, Wishlist } = require('../models');


itemRouter.get('/:name', async (req,res)=>{
    const item= await Item.findOne({
        where: {
            name: req.params.name
        }
    })
    res.json({item})
})


itemRouter.post('/create/:id', async (req, res) => {
    const wishlist = await Wishlist.findByPk(req.params.id)
    const item = await Item.create(req.body)
      await item.setWishlist(wishlist)
      res.json({item})
        
        }  
)
    

itemRouter.put('/update/:id', async (req, res) => {
        const result= await Item.update(  req.body, { 
           
            where :{
                id :req.params.id 
            }
    
        })
        res.json({result})
    })

    itemRouter.delete('/delete/:id', async (req, res) => {
        await Item.destroy({
            where:{
                id: req.params.id
            }
        })
        res.json("item has been deleted")
        });
        
        module.exports = {
            itemRouter
        }