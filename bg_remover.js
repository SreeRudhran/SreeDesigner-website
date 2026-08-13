const sharp = require('sharp');

async function removeBackgroundClean(inputPath, outputPath) {
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const { width, height } = metadata;

  // Get raw RGBA buffer
  const rawBuffer = await image.ensureAlpha().raw().toBuffer();
  const newBuffer = Buffer.from(rawBuffer);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = newBuffer[i];
      const g = newBuffer[i + 1];
      const b = newBuffer[i + 2];

      // Remove top-right studio equipment box if x > width * 0.65 && y < height * 0.25
      if (x > width * 0.65 && y < height * 0.25 && r < 120 && g < 120 && b < 120) {
        newBuffer[i + 3] = 0;
        continue;
      }

      const lightness = (r + g + b) / 3;
      const maxC = Math.max(r, g, b);
      const minC = Math.min(r, g, b);
      const saturation = maxC - minC;

      // Solid background check (white / off-white wall)
      const isBackground = (lightness > 180 && saturation < 30) || (r > 200 && g > 200 && b > 200);

      if (isBackground) {
        if (lightness > 220 || saturation < 15) {
          newBuffer[i + 3] = 0;
        } else {
          const alpha = Math.max(0, Math.min(255, Math.floor((220 - lightness) / 40 * 255)));
          newBuffer[i + 3] = alpha;
        }
      }
    }
  }

  await sharp(newBuffer, {
    raw: {
      width,
      height,
      channels: 4
    }
  })
  .png()
  .toFile(outputPath);

  console.log(`Clean full-length PNG created: ${outputPath}`);
}

const input = process.argv[2];
const output = process.argv[3];

if (input && output) {
  removeBackgroundClean(input, output);
}
