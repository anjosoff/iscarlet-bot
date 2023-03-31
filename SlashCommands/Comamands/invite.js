const {SlashCommandBuilder} = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
module.exports =  {
    name: "invite",
    description: "Link de convite do servidor",
    type: 1,    
    
    run: async (client, interaction, args) => {
        console.log('ping no arquivo ping');
        let embed = new EmbedBuilder()
        .setDescription(`**\\📡 Meu ping está em** \`${client.ws.ping}ms\`**.**`);

        interaction.reply({ embeds: [embed], ephemeral: true })

    }
}