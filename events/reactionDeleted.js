const { EmbedBuilder} = require('discord.js');


        module.exports = {
            name: 'messageReactionRemoveAll',
            
            execute(client, message)  {
                
                
                    const channel = client.channels.cache.get('1228066823090737162');
                         
               
          
                    if (message.content) {
                        var url = message.content;
                      } else {
                        var url = "текста нет";
                      }
                      
             

            const embed = new EmbedBuilder() 
			.setColor('#ff5100')
			.setTitle('Все реакции на сообщении были удалены!')
            .addFields(
                
                { name: 'Автор сообщения: ', value: `${message.author}` },
               { name: 'Текст сообщения: ', value: `${url}` },
               

            )
            .setFooter({ text: `UID: ${message.id}`});
			
			
            channel.send({ embeds: [embed] });
               
                }
            }
        