'use strict'
const bcrypt = require('bcryptjs')
const faker = require('faker')
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          email: 'root@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          name: 'root',
          avatar: 'https://fakeimg.pl/300x300/',
          introduction: faker.lorem.sentences(),
          isAdmin: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          email: 'user1@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          name: 'user1',
          avatar: 'https://fakeimg.pl/300x300/',
          introduction: faker.lorem.sentences(),
          isAdmin: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          email: 'user2@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          name: 'user2',
          avatar: 'https://fakeimg.pl/300x300/',
          introduction: faker.lorem.sentences(),
          isAdmin: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
