const Sequelize = require('sequelize')
const { STRING } = Sequelize
const pry = require('pryjs')

// database stuff
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite"
  });
  
  const User = sequelize.define('user', {
    name: {
      type: STRING
    },
    email: {
      type: STRING
    },
    password: {
      type: STRING
      }
    }
  )

module.exports = User

  sequelize.sync()
  