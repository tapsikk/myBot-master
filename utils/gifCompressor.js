const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

function compressGif(inputPath, outputPath, callback) {
  fs.access(inputPath, fs.constants.F_OK, (err) => {
    if (err) {
      callback(new Error('Input file does not exist'));
      return;
    }

    const optimizationLevel = '--optimize=2';
    const colorRestriction = '--colors 64';
    const lossyCompression = '--lossy=50';
    const gifsicleExePath = path.resolve(__dirname, '..', 'gifsicle.exe');

    exec(`"${gifsicleExePath}" ${optimizationLevel} ${colorRestriction} ${lossyCompression} "${inputPath}" -o "${outputPath}"`, (error, stdout, stderr) => {
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

module.exports = compressGif;