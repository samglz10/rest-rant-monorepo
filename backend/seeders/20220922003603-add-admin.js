'use strict';
const bcrypt =require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('users',[{
    first_name: 'YOUR FIRST NAME',
    last_name: 'YOUR LAST NAME',
    email: 'admin@example.com',
    role: 'admin',
    password_digest: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
    created_at: new Date(),
    updated_at: new Date()
   }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', {
      email: 'admin@example.com'
    })
  }
};
