module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    google: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {});
  return User;
};
