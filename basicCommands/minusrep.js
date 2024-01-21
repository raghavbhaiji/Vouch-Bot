const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { db } = require('../database/database');
const { EmbedBuilder } = require('discord.js');


module.exports = {
  name: 'minusrep',
  description: 'Take away a positive reputation point from a user',
  execute: async (message, args) => {
    const targetUser = message.mentions.users.first();
    if (!targetUser) return message.reply('Please mention a user.');

    const allowedRoles = ['Moderator', 'Admin'];
    const userRoles = message.member.roles.cache.map(role => role.name);

    const userUsedChannel = message.channel;

    const confirmButton = new ButtonBuilder()
      .setCustomId('confirm')
      .setLabel('Confirm')
      .setStyle(ButtonStyle.Success);

    const cancelButton = new ButtonBuilder()
      .setCustomId('cancel')
      .setLabel('Cancel')
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder().addComponents(confirmButton, cancelButton);

    const embed = new EmbedBuilder()
      .setTitle('Reputation Update Confirmation')
      .setDescription(`Do you want to take away 1 rep from ${targetUser.username}?`)
      .setColor('#ff0000');

    const responseChannel = message.guild.channels.cache.get('1145728909380440104');

    if (!responseChannel) {
      return message.reply('The specified response channel does not exist.');
    }

    message.reply(`${message.author}, your reputation decrement request for ${targetUser} has been sent.`);

    const replyMessage = await responseChannel.send({ content: `${message.author}, wants to decrease the reputation of ${targetUser}`, embeds: [embed], components: [row] });

    const filter = i => i.customId === 'confirm' || i.customId === 'cancel';
    const collector = replyMessage.createMessageComponentCollector({ filter, time: 300000 });

collector.on('collect', async interaction => {
  if (interaction.customId === 'confirm') {
    db.run('INSERT OR IGNORE INTO reputation (userID, reputation) VALUES (?, 0)', targetUser.id);
    db.run('UPDATE reputation SET reputation = reputation - 1 WHERE userID = ?', targetUser.id);
    interaction.reply(`Reputation decreased for ${targetUser}.`);
  } else if (interaction.customId === 'cancel') {
    interaction.reply(`Reputation decrease for ${targetUser} canceled.`);
  } else {
    interaction.reply("You do not have permission to confirm this action.");
  }


  collector.stop();
});

collector.on('end', collected => {
  replyMessage.edit({ components: [] });
});

  },
};
