const fs = require('fs');
const data = fs.readFileSync('test.txt', 'utf8');
console.log(data);
console.log('Read Complete');
