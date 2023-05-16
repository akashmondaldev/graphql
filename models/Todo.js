module.exports = (sequelize, DataTypes) => {
    const Todos = sequelize.define("Todos", {
       id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
       },
       title: {
          type: DataTypes.STRING,
          allowNull: false
       },
       message: {
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
       status: {
            type: DataTypes.TINYINT,
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
    return Todos
 };
 