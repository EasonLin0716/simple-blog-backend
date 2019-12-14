'use strict'
const faker = require('faker')
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Claps',
      [
        {
          id: 1,
          clap: 20,
          UserId: 2,
          PostId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          clap: 12,
          UserId: 2,
          PostId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          clap: 14,
          UserId: 3,
          PostId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          clap: 5,
          UserId: 1,
          PostId: 7,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Claps', null, {})
  }
}
