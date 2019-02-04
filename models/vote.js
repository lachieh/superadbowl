module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    type: DataTypes.STRING,
    uid: DataTypes.INTEGER,
    vid: DataTypes.INTEGER,
  }, {});
  Vote.associate = (models) => {
    Vote.belongsTo(models.User, {
      foreignKey: {
        name: 'uid',
        allowNull: false,
      },
    });
    Vote.belongsTo(models.Video, {
      foreignKey: {
        name: 'vid',
        allowNull: false,
      },
    });
  };
  return Vote;
};
