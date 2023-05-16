const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect('mongodb://172.17.0.2:27017/fd_mongoose')
.catch((error) => {
  console.log(error);
  process.exit(1);
});

const server = http.createServer(app);

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log('server started at port = ' + port);
});
