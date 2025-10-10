export default function(req, res, logger) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Server is up.');
  logger.emit('log', `Request: ${req.url}`);
}
