const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

//* need cookieParser middleware before we can do anything with cookies
app.use(cookieParser());
//! To Gte Communcation btw 2 Servers:
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration
//*For Secure data password with dotenv: .config ma path kahan hai: main ma include kra sakhoon;or main ma include kar k kahen bhi use;
dotenv.config({ path: './config.env' });

//* SECure port number
const PORT = process.env.PORT;
//* db connnection:
require('./DB/conn');

//* jo bhi json data a rha ause object ma kar k de do:
app.use(express.json());
//* We Link the router files to make our Routing easy:
const router = require('./router/auth');
app.use(router);

app.listen(PORT, () => {
  console.log(`Port Listening on ${PORT}`);
});
