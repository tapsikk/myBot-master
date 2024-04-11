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
            const activityFile = 'activity.json';
            const activities = loadActivities(activityFile);

            if (activities.length === 0) {
                await interaction.reply('Нет данных для построения графика');
                return;
            }

            const canvas = createCanvas(800, 600);
            const ctx = canvas.getContext('2d');

            drawBackground(ctx, canvas.width, canvas.height);
            drawAxes(ctx, canvas.width, canvas.height);

            const { minValue, maxValue, valueRange } = calculateValueRange(activities);
            drawChart(ctx, activities, minValue, maxValue, valueRange, canvas.width, canvas.height);
            drawYAxisLabels(ctx, minValue, maxValue, valueRange, canvas.height);
            drawXAxisLabels(ctx, activities, canvas.width, canvas.height);

            const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'activity-chart.png' });
            const embed = new EmbedBuilder()
                .setTitle('График активности участников')
                .setImage('attachment://activity-chart.png');

            await interaction.reply({ embeds: [embed], files: [attachment] });
        } catch (error) {
            console.error(error);
            await interaction.reply('Произошла ошибка при построении графика активности');
        }
    },
};

function loadActivities(filePath) {
    if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath));
    } else {
        fs.writeFileSync(filePath, JSON.stringify([]));
        return [];
    }
}

function drawBackground(ctx, width, height) {
    ctx.fillStyle = '#36393F';
    ctx.fillRect(0, 0, width, height);
}

function drawAxes(ctx, width, height) {
    ctx.beginPath();
    ctx.moveTo(50, height - 50);
    ctx.lineTo(50, 50);
    ctx.lineTo(width - 50, 50);
    ctx.strokeStyle = '#fff';
    ctx.stroke();
}

function calculateValueRange(activities) {
    const minValue = Math.min(...activities.map(a => a.memberVoiceCount));
    const maxValue = Math.max(...activities.map(a => a.memberVoiceCount));
    const valueRange = maxValue - minValue;
    return { minValue, maxValue, valueRange };
}

function drawChart(ctx, activities, minValue, maxValue, valueRange, width, height) {
    ctx.beginPath();
    ctx.moveTo(50, height - 50 - ((activities[0].memberVoiceCount - minValue) / valueRange) * (height - 100));
    for (let i = 0; i < activities.length; i++) {
        const x = 50 + i * ((width - 100) / activities.length);
        const y = height - 50 - ((activities[i].memberVoiceCount - minValue) / valueRange) * (height - 100);
        ctx.lineTo(x, y);
    }
    ctx.strokeStyle = '#0DA4FF';
    ctx.stroke();
}

function drawYAxisLabels(ctx, minValue, maxValue, valueRange, height) {
    const valueStep = Math.ceil(valueRange / 10);
    for (let i = minValue; i <= maxValue; i += valueStep) {
        const y = height - 50 - ((i - minValue) / valueRange) * (height - 100);
        ctx.fillStyle = '#fff';
        ctx.fillText(i.toString(), 10, y + 5);
    }
}

function drawXAxisLabels(ctx, activities, width, height) {
    const startTime = new Date(activities[0].timestamp);
    const endTime = new Date(activities[activities.length - 1].timestamp);
    const timeRange = endTime - startTime;
    const timeStep = timeRange / (activities.length - 1);

    for (let i = 0; i < activities.length; i++) {
        const x = 50 + i * ((width - 100) / activities.length);
        const timestamp = activities[i].timestamp;
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        ctx.fillStyle = '#fff';
        ctx.fillText(`${hours}:${minutes}`, x, height - 20);
    }
}