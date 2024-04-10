const { EmbedBuilder } = require('discord.js');
const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("weapon")
    .setDescription("Menu konceptia"),
  async execute(interaction) {
    try {
      const select = new StringSelectMenuBuilder()
        .setCustomId("weapon")  
        .setPlaceholder("нажмите что бы выбрать!")
        .addOptions(
          new StringSelectMenuOptionBuilder()
            .setLabel("Demon's King Longsword")
            // .setDescription('The dual-type Grass/Poison Seed Pokémon.')
            .setEmoji('1225192234262200472')
            .setValue("info 1"),

          new StringSelectMenuOptionBuilder()
            .setLabel("Demonic Plum Flower Sword")
            // .setDescription('The Fire-type Lizard Pokémon.')
            .setEmoji('1225151348191002816')
            .setValue("info 2"),

          new StringSelectMenuOptionBuilder()
            .setLabel("Shadow Scythe")
            // .setDescription('The Water-type Tiny Turtle Pokémon.')
            .setEmoji('1225192387014561853')
            .setValue("info 3"),
        );

      const row = new ActionRowBuilder().addComponents(select);
      await interaction.reply({
        content: "**Выберите оружие!**",
        components: [row],
      });
      await interaction.channel.send({ components: [weapon], content: 'Меню сервера:' });
    } catch (error) {
      console.error(error.message);
    }
  },
 // exampleEmbed: exampleEmbed
};


// стили 

// inside a command, event listener, etc.



/*   const exampleEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
  */