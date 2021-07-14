module.exports = (sequelize, DataType) => {

  const User = sequelize.define('User', {
      id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataType.STRING(100),
        allowNull: false
      },
      email: {
        type: DataType.STRING(100),
        allowNull: false
      },
      password: {
        type: DataType.STRING(12),
        allowNull: false
      },
      confirm_password: {
        type: DataType.STRING(12),
        allowNull: false
      },createdAt: {
        type: DataType.DATE,
      },
      updatedAt: {
        type: DataType.DATE,
      },
      deleted: DataType.BOOLEAN,
      admin: DataType.BOOLEAN,
  },
  {
      tableName: "users",
      timestamps: false
  })

  return User;
}