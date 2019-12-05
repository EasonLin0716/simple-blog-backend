'use strict'
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      cover: DataTypes.STRING,
      UserId: DataTypes.INTEGER
    },
    {}
  )
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.User)
    Post.hasMany(models.Bookmark)
    Post.hasMany(models.Reply)
    Post.hasMany(models.Clap)
  }
  return Post
}
