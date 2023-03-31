const Discord = require("discord.js")
const { EmbedBuilder } = require('discord.js');

module.exports =  {
    name: "ping",
    description: "Ping no meu servidor",
    type: 1,    
    
    run: async (client, interaction, args) => {
        console.log('ping no arquivo ping');
        let embed = new EmbedBuilder()
        .setDescription(`**\\📡 Meu ping está em** \`${client.ws.ping}ms\`**.**`);

        interaction.reply({ embeds: [embed], ephemeral: true })

    }


}
