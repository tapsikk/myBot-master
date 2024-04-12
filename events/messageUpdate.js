const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'messageUpdate',
  execute(client, message, oldMessage, newMessage) {
    const channel = client.channels.cache.get('1228066823090737162');

    let oldMessageContent = 'Текста нет';
    let newMessageContent = 'Текста нет';

    if (oldMessage && oldMessage.content) {
      oldMessageContent = oldMessage.content.toString();
    }

    if (newMessage && newMessage.content) {
      newMessageContent = newMessage.content.toString();
    }

    const embed = new EmbedBuilder()
      .setColor('#00eaff')
      .setTitle('Сообщение было изменено')
      .addFields(
        { name: 'Автор сообщения:', value: oldMessage.author.toString() },
        { name: 'Текст сообщения до изменения:', value: oldMessageContent },
        { name: 'Текст сообщения после изменения:', value: newMessageContent }
      )
      .setFooter({ text: `UID: ${oldMessage.id}` });

    channel.send({ embeds: [embed] });
  },
};