'use strict';

module.exports = {
  up: async (queryInterface, DataType) => {
    queryInterface.createTable('users', {
        id: {
          type: DataType.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: DataType.STRING(100),
        email: {
          type: DataType.STRING(100),
          allowNull: false,
        },
        password: {
          type: DataType.STRING(100),
          allowNull: false,
        },
        confirm_password: {
          type: DataType.STRING(100),
          allowNull: false,
        },
        createdAt: {
          type: DataType.DATE,
        },
        updatedAt: {
          type: DataType.DATE,
        },
        deleted: {
          type: DataType.BOOLEAN,
          defaultValue: false
        },
        admin: {
          type: DataType.BOOLEAN,
          defaultValue: false
        },
    });
  },

  down: async (queryInterface, DataType) => {
    queryInterface.dropTable('users');
  }
};