'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Followships',
      [
        {
          id: 1,
          FollowerId: 2,
          FollowingId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          FollowerId: 3,
          FollowingId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          FollowerId: 1,
          FollowingId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Followships', null, {})
  }
}
