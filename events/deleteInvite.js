const { EmbedBuilder} = require('discord.js');


        module.exports = {
            name: 'inviteDelete',
            
            execute(client, invite)  {
              
                    const channel = client.channels.cache.get('12280668230907371625');
                         
               
          
                 
            

            const embed = new EmbedBuilder() 
			.setColor('#ff7b00')
			.setTitle('Ссылка приглашения удалена!')
            .addFields(
                
               
               { name: 'Ссылка приглашения: ', value: `${invite}` },
               

            )
            
		
			
            channel.send({ embeds: [embed] });
               
                }
            }
        