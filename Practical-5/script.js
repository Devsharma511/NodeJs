const EventEmitter = require('events');
const myEmitter = new EventEmitter();

const eventName = 'greet';

myEmitter.on(eventName, (name) => {
  console.log(`Hello, ${name}! The '${eventName}' event was received.`);
});

console.log("Emitting the 'greet' event...");
myEmitter.emit(eventName, 'NodeJS'); 
console.log("Script finished.");
