'use strict'
module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define(
    'Bookmark',
    {
      PostId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER
    },
    {}
  )
  Bookmark.associate = function(models) {
    // associations can be defined here
    Bookmark.belongsTo(models.Post)
    Bookmark.belongsTo(models.User)
  }
  return Bookmark
}
