const { db } = require('../database/database');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'userinfo',
  description: "Check a user's reputation",
  execute: async (message, args) => {
    const targetUser = message.mentions.users.first() || message.author;

    db.get('SELECT reputation FROM reputation WHERE userID = ?', targetUser.id, (err, row) => {
      if (err) {
        console.error(err);
        return message.reply('An error occurred while fetching reputation.');
      }

      const reputation = row ? row.reputation : 0;

      const embed = new EmbedBuilder()
        .setTitle('User Reputation')
        .setDescription(`${targetUser.username}'s reputation: ${reputation}`)
        .setColor('#7289DA');

      message.reply({ embeds: [embed] });
    });
  },
};
