const { Item, Person, Wishlist, Event } = require('./models');

async function seed() {
  try{
    await Item.destroy({ where: {}});
    await Person.destroy({where: {}});
    await Wishlist.destroy({where: {}});
    await Event.destroy({where: {}});


    // 1. Create 1 instructor
    // 2. Create 4 students
    // 3. Set the relationship between the students and their teacher
  const item1=await Item.create({
      name: 'hat',
      price: 15,
      link: "https://store.nba.com/Mens_New_Era_Black_Miami_Heat_Official_Team_Color_9FORTY_Adjustable_Hat/t-25258593+o-9170+d-909484478+f-4414645+z-9-2220763469?utm_medium=cse&_s=ak1944nba-pla&sku=8834833&targetid=pla-299684793982&gclid=EAIaIQobChMIyOrX-fXw4gIVR7XACh1enwIMEAQYAyABEgIXgPD_BwE"
  })
  const item2=await Item.create({
    name: 'jacket',
    price: 98,
    link: "https://www.everlane.com/products/mens-filled-canvas-jacket-black?utm_medium=cpc&utm_source=pla-google&utm_campaign=837581995&utm_content=330741574923&utm_term=pla-632120221360&adgroup=65713115679&pid=5687-37777&device=c&gclid=EAIaIQobChMI-qDXo_bw4gIVTb7ACh0zdggLEAQYBCABEgLjCfD_BwE"
  })
  const item3=await Item.create({
    name: 'book',
    price: 36,
    link: "https://www.amazon.com/gp/product/0321721330/ref=ox_sc_act_title_1?smid=ATVPDKIKX0DER&psc=1"
  })

  const item4=await Item.create({ 
    name: 'watch',
    price: 240,
    link: "https://nacrewatches.com/products/lune-8-rose-gold-and-white-natural-leather?variant=14806261825578&gclid=EAIaIQobChMI_ZTL7_bw4gIVT_DACh0qwQikEAYYASABEgL4q_D_BwE"
  })
  const item5=await Item.create({ 
      name: 'spoon',
      price: 5,
      link: "https://www.cb2.com/mini-gold-spoon/s179311?localedetail=US&a=501&campaignid=2010083206&adgroupid=75072832247&targetid=pla-742725054363&pla_sku=179311&pcat=HSW&scid=scplp179311&sc_intid=179311&gclid=EAIaIQobChMIx4fcqffw4gIVzsDACh3yvw8tEAQYAyABEgJ53vD_BwE&gclsrc=aw.ds"
    })

    
  const person1=await Person.create({
      name: 'Jonathan Friedberg',
      email: "jfriedberg@gmail.com"
    })

    const person2=await Person.create({
      name: 'Michael McGuire',
      email: "mmGuire@gmail.com"
    })

    const person3=await Person.create({
      name: 'Hristina Lapanova',
      email: "hlapanova@gmail.com"
    })

    const person4=await Person.create({
      name: 'Jonathan Stevens',
      email: "jStevens@gmail.com"
    })

    const person5=await Person.create({
      name: 'Jon Friedburg',
      email: "jfriedburg@gmail.com"
    })


    const wishList1=await Wishlist.create({
      title: "Mother's Day"
    })
    const wishList2=await Wishlist.create({
      title: "Birthday list"
    })

    const wishList3=await Wishlist.create({
      title: "Kwanza"
    })

    const wishList4=await Wishlist.create({
      title: "Bucket list"
    })

    const wishList5=await Wishlist.create({
      title: "Wanted list"
    })
    
    const event1=await Event.create({
      name: "Mother's Day",
      date: "05/18/2020"
    })

    const event2=await Event.create({
      name: "Birthday",
      date: "09/18/2019"
    })

    const event3=await Event.create({
      name: "Kwanza",
      date: "12/20/2019"
    })


    const event4=await Event.create({
      name: "Christmas",
      date: "12/25/2019"
    })

    const event5=await Event.create({
      name: "Cinco de Mayo",
      date: "05/05/2020"
    })

    



  await item1.setWishlist(wishList1)
  await item2.setWishlist(wishList2)
  await item3.setWishlist(wishList3)
  await item4.setWishlist(wishList4)
  await item5.setWishlist(wishList5)

  await event1.setWishlist(wishList1)
  await event2.setWishlist(wishList2)
  await event3.setWishlist(wishList3)
  await event4.setWishlist(wishList4)
  await event5.setWishlist(wishList5)


  await wishList1.setPerson(person1)
  await wishList2.setPerson(person2)
  await wishList3.setPerson(person3)
  await wishList4.setPerson(person4)
  await wishList5.setPerson(person5)


  process.exit();

  }
  catch(e){
    console.log(e.message)
  }
}

seed();