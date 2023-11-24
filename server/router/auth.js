const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate');

require('../DB/conn');
// require Collection:
const User = require('../model/userSchema');

router.get('/', (req, res) => {
  res.send('This is a Home Page: ');
});
//todo to create user:

router.post('/registered', async (req, res) => {
  //? console.log(req.body.name); do with Object Destructuring;You dont write req.body again and again:
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    // console.log(name, email, phone, work, password, cpassword);
    return res.status(422).json({ error: 'plz fill the data in the fields' });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: 'Email already Exist' });
    } else if (password != cpassword) {
      return res.status(422).json({ error: 'Password Not Matched' });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      //* middleware chale ga: hash kare ga:
      const reg = await user.save();
      console.log(reg);

      return res.status(201).json({ Success: 'User Registerd Succesfully' });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: 'fill all the feilds of the form' });
  }
  //* if it finds Data will be returned else null will be returned
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    //* check if both the passwords are same or not
    const isMatched = await bcrypt.compare(password, userExist.password);
    //todo token using auth===== now go to usershema
    const token = await userExist.generateAuthToken();
    if (isMatched) {
      res.cookie('jwttoken', token, {
        expires: new Date(Date.now() + 30000000),
        httpOnly: true,
      });
      return res.status(200).json({ status: 'true' });
    } else {
      return res.status(422).json({ error: 'invalid credentials' });
    }
  } else {
    return res.status(422).json({ error: 'invalid credentials' });
  }
});

//? About us ka page:
router.get('/aboutUs', authenticate, (req, res) => {
  console.log('Hello My About');
  res.send(req.rootUser);
});

//* get User data from Contact us and Home page:
router.get('/getdata', authenticate, (req, res) => {
  console.log('Helo Data');
  res.send(req.rootUser);
});
//* contact us Page
router.post('/contactUs', authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      console.log('Error in Contact us form');
      res.json({ error: 'Plz Filled the Fields Properly' });
    }
    const userexist = await User.findOne({ _id: req.userId });
    if (userexist) {
      const userMessage = await userexist.storeMessage(
        name,
        email,
        phone,
        message
      );
      await userexist.save();
      res.status(201).send({ message: 'User Contact Saved Succesfully' });
    }
  } catch (err) {
    console.log(err);
  }
});

// ?Logout Functionality
router.get('/logout', (req, res) => {
  res.clearCookie('jwttoken', { path: '/' });
  res.status(200).send('User Logout');
});
module.exports = router;
