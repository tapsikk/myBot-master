const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    // имя команды
    .setName("server")
    // описание команды
    .setDescription("Provides information about the server."),
  async execute(interaction) {
    // interaction.guild это объект, представляющий гильдию, в которой была запущена команда
    await interaction.reply(
      `This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`
    );
  },
};
