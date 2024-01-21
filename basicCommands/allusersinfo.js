
const { db } = require('../database/database');
const { EmbedBuilder, Client } = require('discord.js');

module.exports = {
  name: 'allusersinfo',
  description: 'Show all users and their reputation',
  execute: async (message, args, client) => {
    db.all('SELECT * FROM reputation', (err, rows) => {
      if (err) {
        console.error(err);
        return message.reply('An error occurred while fetching data.');
      }

      if (rows.length === 0) {
        return message.reply('No user data found.');
      }


      const userReputations = rows.map(row => `${client.users.cache.get(row.userID)?.toString() || 'Unknown User'}: ${row.reputation}`).join('\n');

     
      const embed = new EmbedBuilder()
        .setTitle('All Users and Their Reputation')
        .setColor('#3498db')
        .setDescription(userReputations);

 
      message.reply({ embeds: [embed] });
    });
  },
};
