'use strict'
module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define(
    'Reply',
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      PostId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER
    },
    {}
  )
  Reply.associate = function(models) {
    // associations can be defined here
    Reply.belongsTo(models.User)
    Reply.belongsTo(models.Post)
  }
  return Reply
}
