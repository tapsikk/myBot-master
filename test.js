const { createCanvas } = require('canvas');
const fs = require('fs');

// Тестовые данные активности
const activities = [
    { timestamp: Date.now() - 86400000, memberVoiceCount: 1 },    // 24 часа назад
    { timestamp: Date.now() - 72000000, memberVoiceCount: 4 },    // 20 часов назад
    { timestamp: Date.now() - 57600000, memberVoiceCount: 3 },    // 16 часов назад
    { timestamp: Date.now() - 43200000, memberVoiceCount: 5 },    // 12 часов назад
    { timestamp: Date.now() - 28800000, memberVoiceCount: 18 },    // 8 часов назад
    { timestamp: Date.now() - 14400000, memberVoiceCount: 22 },    // 4 часа назад
    { timestamp: Date.now(), memberVoiceCount: 12 },               // Текущее время
];

const canvas = createCanvas(800, 600);
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

// Создание и сохранение изображения
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('activity-chart.png', buffer);
console.log('График активности успешно создан и сохранен в файл activity-chart.png');