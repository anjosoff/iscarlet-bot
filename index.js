const Discord = require("discord.js");
const { Client, Intents, GatewayIntentBits, ActivityType, PermissionFlagsBits } = require('discord.js');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js")
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const config = require("./config.json");
client.login(config.token);





module.exports = client;
client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.config = require("./config.json");
require("./handler")(client);
const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob);

client.once('ready', async () => {
    const data = new Date();
    data.setHours(data.getHours() - 3);
    console.log(`[${data.getUTCHours()}:${data.getUTCMinutes()}:${data.getUTCSeconds()}] : ✅ - ${client.user.username} inciado com sucesso!`)
    console.log(`[${data.getUTCHours()}:${data.getUTCMinutes()}:${data.getUTCSeconds()}] : 🔧 - Operando em ${client.guilds.cache.size} servidores!`)
    client.user.setPresence({
        activities: [{ name: `2 comandos para ${client.guilds.cache.size} servidores!`, type: ActivityType.Playing }],
        status: 'online',
      });
})


client.on("interactionCreate", async (interaction) => {
    if (!interaction.guild) return;

    if (interaction.isCommand()) {

        const cmd = client.slashCommands.get(interaction.commandName);

        if (!cmd)
            return;

        const args = [];

        for (let option of interaction.options.data) {

            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }

        cmd.run(client, interaction, args);
    }

    if (interaction.isContextMenuCommand()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);

    }
});