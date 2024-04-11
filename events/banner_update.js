const TextOnGif = require('text-on-gif');
const fs = require('fs');

module.exports = {
  name: 'updateBanner',
  once: false,
  interval: 5 * 60 * 1000, // 5 минут
  async execute(client) {   
    try {
      const serverID = '815648090219872266';
      var guild = client.guilds.cache.get(serverID);
      if (!guild) {
        console.error('Не удалось получить сервер.');
        return;
      }
      // Ожидаем, пока участники сервера будут загружены
      const members = await guild.members.fetch();
      const voiceMembers = members.filter(member => member.voice.channel); // Фильтруем участников в голосовых каналах
      const memberVoiceCount = voiceMembers.size;
      const memberCount = members.size;

      const gif = new TextOnGif({
        file_path: 'media/background.gif'
      });

      gif.font_style = 'cursive';
      gif.font_color = '#0DA4FF';
      gif.font_size = '36px';
      gif.alignment_y = 'top';

      // Добавляем первую строку
      gif.position_y = 170; // Позиция для первой строки
      await gif.textOnGif({
        text: memberVoiceCount.toString(),
        retain: true, // Сохраняем первую строку для последующих изменений
        get_as_buffer: false // Не возвращаем буфер, только сохраняем на диск
      });

      // Изменяем позицию для второй строки
      gif.position_y = 312; // Новая позиция для второй строки (ниже первой)

      // Добавляем вторую строку с retain: true
      await gif.textOnGif({
        text: memberCount.toString(),
        retain: true, // Сохраняем вторую строку поверх первой
        get_as_buffer: false,
        write_path: 'media/taps2.gif' // Путь для сохранения результирующего GIF-файла
      });

      // Ожидаем, пока файл завершит создание
      await new Promise((resolve, reject) => {
        fs.access('media/taps2.gif', fs.constants.F_OK, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      // Загружаем обновленный баннер на сервер
      await guild.setBanner('media/taps2.gif', 'Обновлен баннер сервера');
      console.log(`Обновлен баннер. Участников в голосовых каналах: ${memberVoiceCount}, общее количество участников: ${memberCount}`);
    } catch (error) {
      console.error('Ошибка при обновлении баннера:', error);
    }
  }
};