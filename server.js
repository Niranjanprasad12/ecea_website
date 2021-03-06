const app = require('./app');

const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION SHUTTING DOWN!!!');
  console.log(err.name, err.message, err);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const url = 'mongodb://127.0.0.1:27017/ECEA';

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Local DB Connection successfull...');
  })
  .catch(err => {
    console.log('Local DB not connected...')
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECIEVED. Shutting down gracefully!!!');
  server.close(() => {
    console.log('Process terminated...');
  });
});