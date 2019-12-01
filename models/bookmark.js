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
    Bookmark.belongsTo(model.Post)
    Bookmark.belongsTo(model.User)
  }
  return Bookmark
}
