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
      `Это сервер ${interaction.guild.name} и тут ${interaction.guild.memberCount} учасников.`
    );
  },
};
