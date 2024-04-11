const { Client,  Collection,  Events } = require("discord.js");
const { intents, partials } = require("./utils/config");
const path = require("node:path");
const updateBannerEvent = require('./events/banner_update');
const fs = require("node:fs");
require("dotenv").config();

const token = process.env.TOKEN;
const client = new Client({ intents, partials });

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const eventsPath = path.join(__dirname, "events");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(client, ...args));
  } else {
    client.on(event.name, (...args) => event.execute(client, ...args));
  }
}

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

// вывод ошибки в консоль
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

  // Запускаем функцию для обновления баннера каждые 5 минут
  updateBannerEvent.execute(client);
  setInterval(() => updateBannerEvent.execute(client), updateBannerEvent.interval);



client.login(token);

  client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isStringSelectMenu()) return;
  if (interaction.customId === "weapon") {
    const {
      demonKingLongswordEmbed,
      demonicPlumFlowerSwordEmbed,
      ShadowScythe,
    } = require("./utils/weapon_info.js");

    switch (interaction.values[0]) {
      case "info 1":
        await interaction.reply({ embeds: [demonKingLongswordEmbed] });
        break;

      case "info 2":
        await interaction.reply({ embeds: [demonicPlumFlowerSwordEmbed] });
        break;

      case "info 3":
        await interaction.reply({ embeds: [ShadowScythe] });
        break;


      default:
        await interaction.reply("Неверный выбор");
    }
  }
});



