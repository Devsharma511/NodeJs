import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const sandboxDir = path.resolve('sandbox');
const pkgName = 'lodash';
const version = '4.17.21';

function execCommand(cmd, cwd) {
  execSync(cmd, { stdio: 'inherit', cwd });
}

function getDirChecksum(dirPath) {
  const hash = crypto.createHash('sha256');
  function updateHash(currDir) {
    const entries = fs.readdirSync(currDir).sort();
    for (const entry of entries) {
      const fullPath = path.join(currDir, entry);
      if (fs.statSync(fullPath).isDirectory()) {
        updateHash(fullPath);
      } else {
        hash.update(fs.readFileSync(fullPath));
      }
    }
  }
  updateHash(dirPath);
  return hash.digest('hex');
}

async function main() {
  if(!fs.existsSync(sandboxDir)) {
    fs.mkdirSync(sandboxDir);
  }
  execCommand('npm init -y', sandboxDir);
  execCommand(`npm install ${pkgName}@${version}`, sandboxDir);

  const lockfile = path.join(sandboxDir, 'package-lock.json');
  if (!fs.existsSync(lockfile)) {
    throw new Error('package-lock.json was not created.');
  }
  console.log('package-lock.json is present.');

  const nodeModulesPath = path.join(sandboxDir, 'node_modules');
  const checksum = getDirChecksum(nodeModulesPath);
  console.log('Installed node_modules checksum:', checksum);
}

main().catch(console.error);
