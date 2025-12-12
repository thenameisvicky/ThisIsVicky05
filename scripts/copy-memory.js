const fs = require('fs');
const path = require('path');

/**
 * Copy Memory directory to build output
 * This ensures JSON files are available in the static export
 */
function copyMemoryDir() {
  const sourceDir = path.join(__dirname, '..', 'Memory');
  const destDir = path.join(__dirname, '..', 'out', 'Memory');

  if (!fs.existsSync(sourceDir)) {
    console.warn('⚠ Memory directory not found');
    return;
  }

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const files = fs.readdirSync(sourceDir);
  let copiedCount = 0;

  files.forEach((file) => {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, file);
    
    if (fs.statSync(sourcePath).isFile()) {
      fs.copyFileSync(sourcePath, destPath);
      copiedCount++;
    }
  });

  console.log(`✓ Copied ${copiedCount} files from Memory directory to build output`);
}

copyMemoryDir();

