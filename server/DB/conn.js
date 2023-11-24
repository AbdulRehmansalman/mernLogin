//* Require This fle in app.js
const mongoose = require('mongoose');

const DB = process.env.DATABASE;
mongoose
  .connect(DB)
  .then(() => {
    console.log('Connection SuccesFull');
  })
  .catch((e) => {
    console.log(e);
  });
