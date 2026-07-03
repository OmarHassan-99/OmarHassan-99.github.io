import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, '../public/images');

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  } 
  
  files.forEach(async (file) => {
    const filePath = path.join(directoryPath, file);
    const ext = path.extname(file).toLowerCase();
    
    if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      const outputFilename = file.replace(ext, '.webp');
      const outputPath = path.join(directoryPath, outputFilename);
      
      try {
        await sharp(filePath)
          .webp({ quality: 80 })
          .toFile(outputPath);
          
        console.log(`Converted ${file} to ${outputFilename}`);
        
        // Delete original file
        fs.unlinkSync(filePath);
        console.log(`Deleted original ${file}`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  });
});
