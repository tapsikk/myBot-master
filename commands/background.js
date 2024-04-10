const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');



module.exports = {
  data: new SlashCommandBuilder()
    .setName('update-banner')
    .setDescription('Обновляет баннер сервера с количеством участников'),
  async execute(interaction) {
    const guild = interaction.guild;


  
    await guild.setBanner('./2.png', "Обновлен баннер сервера");

    const embed = new EmbedBuilder()
      .setTitle(guild)
     
   

    await interaction.reply({ embeds: [embed] });
  }
};