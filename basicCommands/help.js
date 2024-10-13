const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { ButtonStyle } = require('discord.js');

module.exports = {
  name: 'help',
  aliases: ['hlp', 'h'],
  description: 'Shows a list of available commands',
  execute(message, args) {
    const botUser = message.client.user;
    const botPing = Date.now() - message.createdTimestamp;
    const serverCount = message.client.guilds.cache.size;
    const embed = new EmbedBuilder()
      .setColor('#FFFFFF')
      .setAuthor({
        name: 'Wanna Know About me ?',
        iconURL: 'https://cdn.discordapp.com/attachments/1122191086501249034/1144865884901486612/7054-neon-info-icon.gif', 
        url: 'https://discord.gg/FUEHs7RCqz'
    })
     
      .setDescription(`__**STATS :**__\n\n> **📊 Bot in servers:** ${serverCount}\n> **🟢 Bot Ping:** ${botPing}ms\n> **👑 Made By [RGDEVELOPMENT](https://www.youtube.com/channel/UCGWGTvUYT_2m4bUlyIDQ0dg)**\n\n__**COMMANDS :**__ `)
      .addFields(
        // Basic commands category
        {
          name: '▶️  Basic',
          value: '`plusrep`, `minusrep`,`ping`, `allusersinfo`',
          inline: true,
        },
        // Utility commands category
        {
          name: '▶️  Utility',
          value: '`support`, `invite`, `userinfo`',
          inline: true,
        }
      )
      .setThumbnail(botUser.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
      .setImage(`https://cdn.discordapp.com/attachments/1144958656153137212/1145758160607510538/VOUCH_BOT.png`);

    const button1 = new ButtonBuilder()
      .setLabel('YouTube')
      .setURL('https://www.youtube.com/channel/UCGWGTvUYT_2m4bUlyIDQ0dg')
      .setStyle(ButtonStyle.Link);

    const button2 = new ButtonBuilder()
      .setLabel('Discord')
      .setURL('https://discord.gg/RgE2QZfJdF')
      .setStyle(ButtonStyle.Link);

    const button3 = new ButtonBuilder()
      .setLabel('BUY NITRO')
      .setURL('https://discord.com/channels/1294571161803423798/1294871054539292742')
      .setStyle(ButtonStyle.Link);
      
    const row = new ActionRowBuilder()
      .addComponents(button1, button2, button3);
    
    message.reply({ embeds: [embed], components: [row] });
  },
};
