import * as fs from "fs-extra";
import sharp from "sharp";
import path from "path";

const inputFolder = "input";
const outputFolder = "output";

const androidFileNamePrefix = "ic_launcher";

// Sizes for the android folders
const androidSizes = {
  "mipmap-hdpi": 72,
  "mipmap-mdpi": 48,
  "mipmap-xhdpi": 96,
  "mipmap-xxhdpi": 144,
  "mipmap-xxxhdpi": 192,
};

// Sizes for the AppIcon.appiconset folder
const appIconSizes = [
  180, 80, 120, 57, 58, 29, 87, 114, 40, 60, 1024, 72, 152, 100, 76, 50, 144, 40, 167, 20, 172, 88, 102, 92, 196, 216,
  48, 55, 66, 87, 32, 16, 64, 128, 256, 512,
];

// Function to create images with specific size
async function createImage(inputPath: string, outputPath: string, size: number): Promise<void> {
  await sharp(inputPath).resize(size, size).toFile(outputPath);
}

// Function to process images
async function processImages() {
  // delete the output directory if it exists
  await fs.remove(outputFolder);
  // Create output directories
  await fs.ensureDir(outputFolder);

  // Create App Store and Play Store images
  const appStorePath = path.join(outputFolder, "appstore.png");
  const playStorePath = path.join(outputFolder, "playstore.png");
  const sampleImage = path.join(inputFolder, (await fs.readdir(inputFolder))[0]);

  await createImage(sampleImage, appStorePath, 1024);
  await createImage(sampleImage, playStorePath, 1024);

  // Create android folder and subfolders
  const androidFolder = path.join(outputFolder, "android");
  await fs.ensureDir(androidFolder);

  for (const folder of Object.keys(androidSizes)) {
    const folderPath = path.join(androidFolder, folder);
    await fs.ensureDir(folderPath);

    for (const file of await fs.readdir(inputFolder)) {
      const inputPath = path.join(inputFolder, file);
      const outputPath = path.join(folderPath, file);
      // @ts-ignore
      await createImage(inputPath, outputPath, androidSizes[folder]);
    }
  }

  // Create Assets.xcassets/AppIcon.appiconset
  const assetsFolder = path.join(outputFolder, "Assets.xcassets", "AppIcon.appiconset");
  await fs.ensureDir(assetsFolder);

  for (const size of appIconSizes) {
    const outputPath = path.join(assetsFolder, `${size}.png`);
    await createImage(sampleImage, outputPath, size);
  }

  // Create Contents.json
  const contentsJson = {
    images: appIconSizes.map((size) => ({
      idiom: "universal",
      size: `${size}x${size}`,
      filename: `${size}.png`,
      scale: "1x",
    })),
    info: {
      version: 1,
      author: "xcode",
    },
  };

  await fs.writeJson(path.join(assetsFolder, "Contents.json"), contentsJson, { spaces: 2 });
}

// Execute the processing function
processImages().catch((err) => console.error(err));
