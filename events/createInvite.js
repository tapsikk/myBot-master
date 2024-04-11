const { EmbedBuilder} = require('discord.js');


        module.exports = {
            name: 'inviteCreate',
            
            execute(client, invite)  {
                
                
                    const channel = client.channels.cache.get('1228066823090737162');
                         
               
          
                
            

            const embed = new EmbedBuilder() 
			.setColor('#ffee00')
			.setTitle('Ссылка приглашения создана')
            .addFields(
                
                { name: 'Автор приглашения (ID): ', value: `${invite.inviterId}` },
               { name: 'Ссылка приглашения: ', value: `${invite}` },
               

            )
            
		
			
            channel.send({ embeds: [embed] });
               
                }
            }