const fs = require('node:fs');
const path = require('node:path');

// Требовать необходимые классы discord.js
const { Client, Collection,  Events, GatewayIntentBits, Message} = require('discord.js');
require('dotenv').config();
const token = process.env.DISCORD_TOKEN;

// Создаем новый экземпляр клиента
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Войдите в Discord с токеном вашего клиента
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Установите новый элемент в коллекции с ключом в качестве имени команды и значением в качестве экспортируемого модуля.
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// вывод ошибки в консоль
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Когда клиент будет готов, запустите этот код (только один раз)
// Мы используем 'c' для параметра события, чтобы отделить его от уже определенного 'клиента'
client.once(Events.ClientReady, c => {
	console.log(`Запуск! 1... 2... 3...  ${c.user.tag} на связи.`);
});

client.on("messageCreate", async (message) => {
	if (message.mentions.has(client.user)){

		message.reply("слушаю:)")
	}
})



// всегда внизу !!!!
client.login(token);