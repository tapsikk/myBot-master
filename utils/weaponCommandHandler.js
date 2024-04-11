module.exports = {
    handleWeaponCommand: async (interaction) => {
      const { demonKingLongswordEmbed, demonicPlumFlowerSwordEmbed, ShadowScythe } = require("./weapon_info.js");
      const embed = {
        "info 1": demonKingLongswordEmbed,
        "info 2": demonicPlumFlowerSwordEmbed,
        "info 3": ShadowScythe,
      }[interaction.values[0]] || { content: "Неверный выбор" };
      await interaction.reply({ embeds: [embed] });
    },
  };