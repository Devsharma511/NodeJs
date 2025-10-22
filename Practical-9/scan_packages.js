import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const nodeModulesDir = path.join(process.cwd(), 'node_modules');

function sha256File(filePath) {
  const data = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(data).digest('hex');
}

function getPackageInfo(pkgName) {
  const pkgDir = path.join(nodeModulesDir, pkgName);
  const pkgJsonPath = path.join(pkgDir, 'package.json');
  if (!fs.existsSync(pkgJsonPath)) return null;
  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
  const files = fs.readdirSync(pkgDir);
  const hasLicense = files.some(f => f.toLowerCase().startsWith('license'));
  const jsFiles = files.filter(f => f.endsWith('.js')).slice(0, 2);
  const shaPreview = jsFiles.map(f =>
    `${f}:${sha256File(path.join(pkgDir, f)).slice(0, 8)}...`
  ).join(', ');
  return {
    version: pkgJson.version,
    hasLicense,
    shaPreview,
    fileCount: files.length
  };
}

const packages = fs.readdirSync(nodeModulesDir).filter(p =>
  fs.existsSync(path.join(nodeModulesDir, p, 'package.json'))
);

console.log('Dependency Summary:');
packages.forEach(pkg => {
  const info = getPackageInfo(pkg);
  if (!info) return;
  console.log(`- ${pkg} (version: ${info.version}, files: ${info.fileCount}, license: ${info.hasLicense ? 'Yes' : 'No'}, sha: ${info.shaPreview})`);
});

console.log('\nPackages missing license file:');
packages.forEach(pkg => {
  const info = getPackageInfo(pkg);
  if (info && !info.hasLicense) {
    console.log(pkg);
  }
});
