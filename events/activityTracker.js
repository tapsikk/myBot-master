// activityTracker.js
const fs = require('fs');

module.exports = {
    name: 'activityTracker',
    once: false,
    interval: 30 * 60 * 1000, // 30 минут
    async execute(client) {
        try {
            const serverID = '815648090219872266';
            const guild = client.guilds.cache.get(serverID);
            if (!guild) {
                console.error('Не удалось получить сервер.');
                return;
            }

            const members = await guild.members.fetch();
            const voiceMembers = members.filter(member => member.voice.channel);
            const memberVoiceCount = voiceMembers.size;

            const timestamp = Date.now();
            const activityData = { timestamp, memberVoiceCount };

            const activityFile = 'activity.json';
            let activities = [];

            if (fs.existsSync(activityFile)) {
                activities = JSON.parse(fs.readFileSync(activityFile));
            }

            activities.push(activityData);
            fs.writeFileSync(activityFile, JSON.stringify(activities));

            console.log(`Записано количество участников в голосовых каналах: ${memberVoiceCount}`);
        } catch (error) {
            console.error('Ошибка при отслеживании активности:', error);
        }
    }
};