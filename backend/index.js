const http = require('http');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const sequelize = require('./database')
const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
// const apiRoutes = require('./routes');

// app.use('/api', cors(), apiRoutes);

const server = http.createServer(app);


const PORT = process.env.PORT || 3001;
server.listen(PORT);

server.on('listening', () => {
  console.log(`Server is Listening on PORT ${PORT}`);
});

module.exports = app;
