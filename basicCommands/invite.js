const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'Generate an invite link for the bot.',
    execute(message, args) {
      
        const permissions = [
            'ADMINISTRATOR',
            'SEND_MESSAGES',
            'READ_MESSAGES',
       
        ];

        const inviteLink = `https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&scope=bot&permissions=${permissions.join('%20')}`;

        
        const embed = new EmbedBuilder()
            .setColor('#7289DA')
            .setTitle('Bot Invite Link')
            .setDescription(`Click below to add this Bot :\n[Invite Bot](${inviteLink})`)
            .setTimestamp();

       
        message.reply({ embeds: [embed] });
    },
};
