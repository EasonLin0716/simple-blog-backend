'use strict'
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      UserId: DataTypes.INTEGER
    },
    {}
  )
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(model.User)
    Post.hasMany(model.Bookmark)
    Post.hasMany(model.Reply)
    Post.hasMany(model.Clap)
  }
  return Post
}
