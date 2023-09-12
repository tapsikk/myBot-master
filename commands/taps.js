const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    // имя команды
    .setName("taps")
    // описание команды
    .setDescription("Replies with smile"),
  async execute(interaction) {
    // действие команды
    await interaction.reply("^-^");
  },
};
