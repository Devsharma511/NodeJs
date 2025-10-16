import { pathToFileURL } from 'url';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function dynamicImport(file) {
  try {
    const resolvedPath = path.resolve(__dirname, file);
    const fileUrl = pathToFileURL(resolvedPath).href;

    if (file.endsWith('.json')) {
      const module = await import(fileUrl, {
        with: { type: 'json' } 
      });
      return module.default;
    } else if (file.endsWith('.js') || file.endsWith('.mjs')) {
      const module = await import(fileUrl);
      return module.default ?? module;
    } else {
      throw new Error('Unsupported file type: must be .js, .mjs, or .json');
    }
  } catch (err) {
    console.error(`Error importing ${file}:`, err);
    throw err;
  }
}

(async () => {
  const jsonData = await dynamicImport('./data/sample.json');
  console.log(' JSON Data:', jsonData);

  const jsModule = await dynamicImport('./modules/util.js');
  console.log(' JS Module Export:', jsModule);
})();
