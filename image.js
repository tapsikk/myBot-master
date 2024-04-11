import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminSvgo from 'imagemin-svgo';
import getStream from 'get-stream';

const inputDir = './media/taps2.gif';
const outputDir = './media/output.gif';

async function compressImages(inputDir, outputDir) {
  try {
    const compressedFiles = await imagemin([`${inputDir}`], {
      destination: outputDir,
      plugins: [
        imageminMozjpeg({ quality: 80 }),
        imageminPngquant({ quality: [0.6, 0.8] }),
        imageminGifsicle({ optimizationLevel: 2, maxBuffer: 1024 * 1024 * 10 }),
        imageminSvgo(),
      ],
    });

    console.log('Images compressed successfully:');
    compressedFiles.forEach((file) => console.log(file.destinationPath));
  } catch (error) {
    console.error('Error compressing images:', error);
  }
}

compressImages(inputDir, outputDir);