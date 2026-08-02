import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagesDir = path.join(__dirname, '../public/images');

const MAX_WIDTH = 1000; // Resize large images
const QUALITY = 75;

async function optimizeImages() {
  const files = fs.readdirSync(imagesDir);

  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const ext = path.extname(file).toLowerCase();

    if (!['.png', '.jpg', '.jpeg', '.webp', '.jfif'].includes(ext)) {
      continue;
    }

    try {
      const metadata = await sharp(filePath).metadata();
      const fileSize = fs.statSync(filePath).size;
      
      console.log(`Optimizing: ${file} (${(fileSize / 1024).toFixed(2)} KB)`);

      const outputPath = path.join(imagesDir, `temp-${file}`);
      
      let pipeline = sharp(filePath);
      
      if (metadata.width > MAX_WIDTH) {
        pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
      }

      if (ext === '.png') {
        await pipeline.png({ quality: QUALITY, compressionLevel: 9 }).toFile(outputPath);
      } else if (ext === '.webp') {
        await pipeline.webp({ quality: QUALITY }).toFile(outputPath);
      } else {
        await pipeline.jpeg({ quality: QUALITY }).toFile(outputPath);
      }
      
      fs.renameSync(outputPath, filePath);
      
      const newSize = fs.statSync(filePath).size;
      console.log(`✅ Done: ${file} -> ${(newSize / 1024).toFixed(2)} KB`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

optimizeImages();
