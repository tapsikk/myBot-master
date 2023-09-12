const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const fs = require('node:fs');
require('dotenv').config();

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.clientId;
const guildId = process.env.guildId;


const commands = [];
// Возьмите все командные файлы из каталога команд, который вы создали ранее.
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Возьмите выходные данные SlashCommandBuilder#toJSON() каждой команды для развертывания.
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Создайте и подготовьте экземпляр модуля REST.
const rest = new REST({ version: "10" }).setToken(token);

// и разверните свои команды!
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // Метод put используется для полного обновления всех команд в гильдии с текущим набором.
        const data = await rest.put(
			// Routes.applicationGuildCommands для команд для выгрузки на личный сервер.
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // И, конечно же, убедитесь, что вы ловите и регистрируете любые ошибки!
        console.error(error);
    }
})();