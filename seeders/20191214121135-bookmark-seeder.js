'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Bookmarks',
      [
        {
          id: 1,
          PostId: 6,
          UserId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          PostId: 10,
          UserId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          PostId: 1,
          UserId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Bookmarks', null, {})
  }
}
