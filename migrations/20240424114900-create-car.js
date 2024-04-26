'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("cars", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      plate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      manufacture: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull:true,
        defaultValue: "http://via.placeholder.com/600x400"
      },
      rentPerDay: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      carSize: {
        type: Sequelize.ENUM(["small","medium", "large"]),
        allowNull: false,
        defaultValue: "small",
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      availableAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      transmission: {
        type: Sequelize.ENUM(["Automatic", "Manual", "Automanual"]),
        allowNull: false
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      typeCars: {
        type: Sequelize.STRING,
        allowNull:false
      },
      createdAt: { 
        allowNull: false,
        type: Sequelize.DATE,},

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
