const Sequelize = require("sequelize");

const db = new Sequelize(process.env.DATABASE_URL , {
  dialect: 'postgres'
 });

const Item = db.define("items", {
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: Sequelize.INTEGER,
  link: {
    type: Sequelize.TEXT,
    allowNull: true
  }
});

const Wishlist = db.define("wishlists", {
  title: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

const Person = db.define("persons", {
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  email: {
    type: Sequelize.TEXT,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

const Event = db.define("events", {
  name: {
    type: Sequelize.TEXT,
    unique: false,
    allowNull: true
  },
  date: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true
  }
})


Wishlist.hasMany(Item);
Item.belongsTo(Wishlist);
Event.belongsTo(Wishlist);
Wishlist.hasMany(Event);
Person.hasMany(Wishlist);
Wishlist.belongsTo(Person)

module.exports = {
  Item,
  Wishlist,
  Person,
  Event,
  db
};