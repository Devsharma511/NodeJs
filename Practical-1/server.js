const http = require('http'), fs = require('fs');
http.createServer((req, res) => {
  if (req.url === '/read') fs.readFile('input.txt', 'utf8', (e, d) => res.end(e ? 'Error' : d));
  else if (req.url === '/write') fs.writeFile('output.txt', 'Hello!', e => res.end(e ? 'Error' : 'Written'));
  else res.end('Hello Node.js');
}).listen(3000, () => console.log('Running at http://localhost:3000'));
