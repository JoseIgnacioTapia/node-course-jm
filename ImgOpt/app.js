import fse from "fs-extra";
import imagemin from "imagemin";
import imageminPngquant from "imagemin-pngquant";
import imageminGifsicle from "imagemin-gifsicle";
import imageminWebp from "imagemin-webp";
import imageminSvgo from "imagemin-svgo";
import imageminJpegtran from "imagemin-jpegtran";
import sharp from "sharp";

let inputFolder = "src";
let outputFolder = "opt";
let targetWidth = 1920;

const processImg = async () => {
  try {
    const files = await fse.readdir(inputFolder);

    for (const file of files) {
      let inputPath = `${inputFolder}/${file}`;
      let outputPath = `${outputFolder}/${file}`;

      await sharp(inputPath).resize(targetWidth).toFile(outputPath);

      await imagemin([outputPath], {
        destination: outputFolder,
        plugins: [
          imageminPngquant(), // Comprimir imagen PNG
          imageminGifsicle(), // Comprimir imagen GIF
          imageminWebp({ quality: 80 }), // Convertir imagen a WebP con calidad 80%
          imageminSvgo(), // Comprimir imagen SVG
          imageminJpegtran({ quality: 80 }), // Comprimir imagen JPEG con calidad 80%
        ],
      });

      console.log(`Se ha optimizado la imagen ${file}`);
    }

    console.log("Se optimizaron todas tus imagenes");
  } catch (error) {
    console.error(error);
  }
};

processImg();
