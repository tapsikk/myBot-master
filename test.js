const { exec } = require('child_process');
const fs = require('fs');

function compressGif(inputPath, outputPath, callback) {
    // Проверяем, существует ли входной файл
    fs.access(inputPath, fs.constants.F_OK, (err) => {
      if (err) {
        callback(new Error('Input file does not exist'));
        return;
      }
  
      // Задаем параметры сжатия
      const optimizationLevel = '--optimize=2'; // Уровень оптимизации
      const colorRestriction = '--colors 64'; // Ограничение на количество цветов
      const lossyCompression = '--lossy=50'; // Использование потерь для сжатия
  
      // Запускаем процесс сжатия гиф-файла с новыми параметрами
      exec(`gifsicle ${optimizationLevel} ${colorRestriction} ${lossyCompression} ${inputPath} -o ${outputPath}`, (error, stdout, stderr) => {
        if (error) {
          callback(error);
          return;
        }
  
        if (stderr) {
          callback(new Error(stderr));
          return;
        }
  
        callback(null, outputPath);
      });
    });
  }
  
  // Пример использования
  compressGif('taps2.gif', 'output.gif', (error, outputPath) => {
    if (error) {
      console.error('Error compressing gif:', error);
      return;
    }
  
    console.log('Gif compressed successfully:', outputPath);
  });