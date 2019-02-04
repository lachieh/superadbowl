module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
    title: DataTypes.STRING,
    company: DataTypes.STRING,
    url: DataTypes.STRING,
  }, {});
  Video.associate = (models) => {
    Video.hasMany(models.Vote, {
      foreignKey: {
        name: 'vid',
      },
    });
  };
  return Video;
};
