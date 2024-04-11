const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Предоставляет информацию о сервере"),
  async execute(interaction) {
    await interaction.reply(
      `Это сервер ${interaction.guild.name} и тут ${interaction.guild.memberCount} учасников.`
    );
  },
};
