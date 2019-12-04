'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      avatar: DataTypes.STRING,
      introduction: DataTypes.TEXT,
      isAdmin: DataTypes.BOOLEAN
    },
    {}
  )
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Post)
    User.hasMany(models.Clap)
    User.hasMany(models.Bookmark)
    User.hasMany(models.Reply)
    User.belongsToMany(User, {
      through: models.Followship,
      foreignKey: 'followingId',
      as: 'Followers'
    })
    User.belongsToMany(User, {
      through: models.Followship,
      foreignKey: 'followerId',
      as: 'Followings'
    })
  }
  return User
}
