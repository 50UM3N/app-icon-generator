# Image Processor

This project processes images to generate specific image sizes required for Android and iOS development. It uses `sharp` for image processing and `fs-extra` for file system operations.

## Features

- Generates `appstore.png` and `playstore.png` with size 1024x1024px.
- Creates an `android` folder with subfolders for different density sizes:
  - mipmap-hdpi (72x72px)
  - mipmap-mdpi (48x48px)
  - mipmap-xhdpi (96x96px)
  - mipmap-xxhdpi (144x144px)
  - mipmap-xxxhdpi (192x192px)
- Creates an `Assets.xcassets/AppIcon.appiconset` folder with 34 images of specified sizes for iOS.
- Generates a `Contents.json` file in the `AppIcon.appiconset` folder with image metadata.

## Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/image-processor.git
    cd image-processor
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Place your input images in the `input` folder. Ensure the folder contains at least one image.

4. Run the script:

    ```bash
    npm start
    ```

## Project Structure

- `input/`: Folder where you place your input images.
- `output/`: Folder where the processed images will be saved.
- `index.ts`: The main script for processing images.
- `package.json`: Contains the project metadata and dependencies.
- `README.md`: This file.

## How It Works

1. The script reads the images from the `input` folder.
2. It generates `appstore.png` and `playstore.png` with a size of 1024x1024px in the `output` folder.
3. It creates the `android` folder with subfolders for different densities and resizes all input images accordingly.
4. It selects the first image from the `input` folder and generates 34 images of specific sizes in the `Assets.xcassets/AppIcon.appiconset` folder.
5. It generates a `Contents.json` file with metadata for the images in the `AppIcon.appiconset` folder.

## Example

Here is an example of running the script:

```bash
npm start
```

After running the script, the `output` folder will contain the following structure:
```
output/
├── android/
│   ├── mipmap-hdpi/
│   │   └── [resized images]
│   ├── mipmap-mdpi/
│   │   └── [resized images]
│   ├── mipmap-xhdpi/
│   │   └── [resized images]
│   ├── mipmap-xxhdpi/
│   │   └── [resized images]
│   ├── mipmap-xxxhdpi/
│   │   └── [resized images]
├── Assets.xcassets/
│   ├── AppIcon.appiconset/
│   │   ├── 16.png
│   │   ├── 20.png
│   │   ├── 29.png
│   │   ├── 32.png
│   │   ├── 40.png
│   │   ├── 48.png
│   │   ├── 50.png
│   │   ├── 55.png
│   │   ├── 57.png
│   │   ├── 58.png
│   │   ├── 60.png
│   │   ├── 64.png
│   │   ├── 66.png
│   │   ├── 72.png
│   │   ├── 76.png
│   │   ├── 80.png
│   │   ├── 87.png
│   │   ├── 88.png
│   │   ├── 92.png
│   │   ├── 100.png
│   │   ├── 102.png
│   │   ├── 114.png
│   │   ├── 120.png
│   │   ├── 128.png
│   │   ├── 144.png
│   │   ├── 152.png
│   │   ├── 167.png
│   │   ├── 172.png
│   │   ├── 180.png
│   │   ├── 196.png
│   │   ├── 216.png
│   │   ├── 256.png
│   │   ├── 512.png
│   │   ├── 1024.png
│   │   └── Contents.json
├── appstore.png
└── playstore.png
```

## License

This project is licensed under the MIT License.
