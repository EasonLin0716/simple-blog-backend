'use strict'
const faker = require('faker')
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Replies',
      Array.from({ length: 24 }).map((item, index) => ({
        id: index + 1,
        content: faker.lorem.sentences(),
        postId: Math.floor(Math.random() * 12) + 1,
        userId: (index % 3) + 1,
        createdAt: new Date(),
        updatedAt: new Date()
      })),
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Replies', null, {})
  }
}
