// commands/activityChart.js
const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('activitychart')
        .setDescription('Построить график активности участников в голосовых каналах'),
    async execute(interaction) {
        try {

           /* if (interaction.user.id !== '399237051695890434') {
                await interaction.reply('У вас нет доступа к этой команде.');
                return;
            }

            */
            const activityFile = './activity.json';
            let activities = [];

            if (fs.existsSync(activityFile)) {
                try {
                    const data = fs.readFileSync(activityFile, 'utf-8');
                    console.log(`Содержимое файла ${activityFile}: ${data}`);
                    activities = JSON.parse(data);
                } catch (error) {
                    console.error(`Ошибка при загрузке данных активности: ${error}`);
                }
            } else {
                console.log(`Файл ${activityFile} не существует.`);
                fs.writeFileSync(activityFile, JSON.stringify([]));
            }

            if (activities.length === 0) {
                await interaction.reply('Нет данных для построения графика');
                return;
            }

            const canvas = createCanvas(1280, 720);
            const ctx = canvas.getContext('2d');

            // Установка фона
            ctx.fillStyle = '#36393F';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Рисование осей
            ctx.beginPath();
            ctx.moveTo(50, canvas.height - 50);
            ctx.lineTo(50, 50);
            ctx.lineTo(canvas.width - 50, 50);
            ctx.strokeStyle = '#fff';
            ctx.stroke();

            // Вычисление минимального и максимального значений для масштабирования
            const minValue = Math.min(...activities.map(a => a.memberVoiceCount));
            const maxValue = Math.max(...activities.map(a => a.memberVoiceCount));
            const valueRange = maxValue - minValue;

            // Рисование графика
            ctx.beginPath();
            ctx.moveTo(50, canvas.height - 50 - ((activities[0].memberVoiceCount - minValue) / valueRange) * (canvas.height - 100));
            for (let i = 0; i < activities.length; i++) {
                const x = 50 + i * ((canvas.width - 100) / activities.length);
                const y = canvas.height - 50 - ((activities[i].memberVoiceCount - minValue) / valueRange) * (canvas.height - 100);
                ctx.lineTo(x, y);
            }
            ctx.strokeStyle = '#0DA4FF';
            ctx.stroke();

            // Рисование меток для значений по оси Y
            const valueStep = Math.ceil(valueRange / 10);
            for (let i = minValue; i <= maxValue; i += valueStep) {
                const y = canvas.height - 50 - ((i - minValue) / valueRange) * (canvas.height - 100);
                ctx.fillStyle = '#fff';
                ctx.fillText(i.toString(), 10, y + 5);
            }

            // Рисование меток для времени по оси X
            const startTime = new Date(activities[0].timestamp);
            const endTime = new Date(activities[activities.length - 1].timestamp);
            const timeRange = endTime - startTime;
            const timeStep = timeRange / (activities.length - 1);

            for (let i = 0; i < activities.length; i++) {
                const x = 50 + i * ((canvas.width - 100) / activities.length);
                const timestamp = activities[i].timestamp;
                const date = new Date(timestamp);
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                ctx.fillStyle = '#fff';
                ctx.fillText(`${hours}:${minutes}`, x, canvas.height - 20);
            }

            // Создание буфера с изображением
            const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'activity-chart.png' });

            // Создание Embed с изображением
            const embed = new EmbedBuilder()
                .setTitle('График активности участников')
                .setImage('attachment://activity-chart.png');

            // Отправка Embed с изображением
            await interaction.reply({ embeds: [embed], files: [attachment] });
        } catch (error) {
            console.error(error);
            await interaction.reply('Произошла ошибка при построении графика активности');
        }
    },
};