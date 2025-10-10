import http from 'node:http';
import fs from 'node:fs';
import { pipeline } from 'node:stream/promises';
import readline from 'node:readline';
import path from 'node:path';
import EventEmitter from 'node:events';

class Logger extends EventEmitter {
    constructor({ maxSize }) {
        super();
        this.maxSize = maxSize || 5120;
        this.files = [];
        this.currentStream = null;
        this.currentSize = 0;
        this.idx = 0;
        this.on('log', (msg) => this._toConsole(msg));
        this.on('log', (msg) => this._toFile(msg));
    }
    _toConsole(msg) { process.stdout.write(msg + '\n'); }
    _toFile(msg) {
        if (!this.currentStream || this.currentSize >= this.maxSize) {
            if (this.currentStream) this.currentStream.end();
            const file = path.join('logs', `log_${++this.idx}.txt`);
            fs.mkdirSync('logs', { recursive: true });
            this.currentStream = fs.createWriteStream(file);
            this.currentSize = 0;
            this.files.push(file);
        }
        this.currentStream.write(msg + '\n');
        this.currentSize += Buffer.byteLength(msg + '\n');
    }
    close() { if (this.currentStream) this.currentStream.end(); }
}

const logger = new Logger({ maxSize: 5120 });

async function processCSV(input, output) {
    const rl = readline.createInterface({
        input: fs.createReadStream(input),
        crlfDelay: Infinity
    });
    const domainCount = {};
    for await (const line of rl) {
        const email = line.split(',')[1];
        if (email) {
            const domain = email.split('@')[1];
            if (domain) {
                domainCount[domain] = (domainCount[domain] || 0) + 1;
                logger.emit('log', `Counted ${domain}: ${domainCount[domain]}`);
            }
        }
    }
    await fs.promises.writeFile(output, JSON.stringify(domainCount));
    logger.emit('log', 'CSV processing done');
}

const moduleName = './routes.js';
const routes = await import(moduleName);

const server = http.createServer((req, res) => {
    routes.default(req, res, logger);
});
server.listen(3000);

await processCSV('data/users.csv', 'out/domains.json');
logger.close();
