module.exports = (sequelize, DataTypes) => {
   const Posts = sequelize.define("Posts", {
      id: {
         type: DataTypes.STRING,
         allowNull: false,
         primaryKey: true,
      },
      title: {
         type: DataTypes.STRING,
         allowNull: false
      },
      content: {
         type: DataTypes.STRING,
         allowNull: true
      },
      imageUrl: {
         type: DataTypes.STRING,
         allowNull: true
      },
      userId: {
         type: DataTypes.STRING,
         allowNull: false
      },
      createdAt: {
         type: DataTypes.STRING,
         allowNull: true
      },
      updatedAt: {
         type: DataTypes.STRING,
         allowNull: true
      }
   })
   return Posts
};
