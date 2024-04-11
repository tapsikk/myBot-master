const { EmbedBuilder } = require('discord.js');


  module.exports = {
    name: 'messageUpdate',

    execute(client, oldMessage, newMessage) {

      const channel = client.channels.cache.get('1228066823090737162');



      if (oldMessage) {
        var url = oldMessage.content;
      } else {
        var url = "текста нет";
      }
      if (newMessage.content) {
        var url2 = newMessage.content;
      } else {
        var url2 = "текста нет";
      }



      const embed = new EmbedBuilder()
        .setColor('#00eaff')
        .setTitle('Сообщение было изменено')
        .addFields(
          

          { name: 'Автор сообщения: ', value: `${oldMessage.author}` },
          { name: 'Текст сообщения до изменения: ', value: `${url}` },
          { name: 'Текст сообщения после изменения: ', value: `${url2}` },
          


        )
        .setFooter({ text: `UID: ${oldMessage.id}` });


      channel.send({ embeds: [embed] });

    }
  };

        