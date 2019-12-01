'use strict'
module.exports = (sequelize, DataTypes) => {
  const Clap = sequelize.define(
    'Clap',
    {
      clap: DataTypes.INTEGER,
      PostId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER
    },
    {}
  )
  Clap.associate = function(models) {
    // associations can be defined here
    Clap.belongsTo(model.User)
    Clap.belongsTo(model.Post)
  }
  return Clap
}
