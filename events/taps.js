module.exports = {
  name: 'messageCreate',
  execute(client, message) {
    // Проверяем, содержит ли сообщение упоминание бота
    if (message.mentions.has(client.user)) {
      // Реагируем на упоминание
      message.reply("Привет! Я здесь!");
    }
    // Проверяем, содержит ли сообщение команду "!тапс"
    if (message.content == 'тапс') {
      // Реагируем на команду
      message.react('👋')
        .catch(console.error);
      message.reply("я тапсик хихвыфффффихи");
    }
      if (message.content == 'диктор') {
        message.react('👋')
          .catch(console.error);
        message.reply("чего надо от него? ААААА");
    }
  }
}
