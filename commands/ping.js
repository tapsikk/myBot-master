const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    // имя команды
    .setName("ping")
    // описание команды
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    // действие команды
    await interaction.reply("Pong!");
  },
};
