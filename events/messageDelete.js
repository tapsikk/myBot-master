const { EmbedBuilder} = require('discord.js');


        module.exports = {
            name: 'messageDelete',
           
            execute(client, message)  {
                
             
                    const channel = client.channels.cache.get('1228066823090737162');
                         
               
          
                    if (message.content) {
                        var url = message.content;
                      } else {
                        var url = "текста нет";
                      }
                      
             

            const embed = new EmbedBuilder() 
			.setColor('#ff0000')
			.setTitle('Сообщение удалено')
            .addFields(
                
                
                { name: 'Автор сообщения: ', value: `${message.author}` },
               { name: 'Текст сообщения: ', value: `${url}` },
               { name: 'Канал: ', value: `${message.channel}` },
               { name: 'Время удаления: ', value: `${message.createdAt}` },

            )
            .setFooter({ text: `UID: ${message.id}`});
			
			
            channel.send({ embeds: [embed] });
               
                }
            }
        