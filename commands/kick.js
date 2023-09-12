const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Select a member and kick them (but not really).")
    .addUserOption((option) =>
      option.setName("цель").setDescription("The member to kick")
    ),
  async execute(interaction) {
    const member = interaction.options.getMember("цель");
    member.kick({ reason: "reason" });
    interaction.reply({
      content: `Вы кикнули бездаря по имени: ${member.user.username}`,
      ephemeral: true,
    });
    // return interaction.reply({ content: `По причине: ${reason}` });
  },
};
