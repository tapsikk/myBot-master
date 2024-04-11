const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("taps")
    .setDescription("Попробуй!"),
  async execute(interaction) {
    await interaction.reply("^-^");
  },
};
