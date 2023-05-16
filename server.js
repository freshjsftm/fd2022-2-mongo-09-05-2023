// require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

const host = process.env.HOST || 'fd_mongo';

mongoose.connect(`mongodb://${host}:27017/fd_mongoose`)
.catch((error) => {
  console.log(error);
  process.exit(1);
});

const server = http.createServer(app);

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log('server started at port = ' + port);
});
