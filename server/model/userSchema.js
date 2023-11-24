const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSChema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },

  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  messages: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
  ],
  // tokens aik baar nhi use hote<user bohat cbaar token generate kare ga:
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//* To Hash the Password: Humein ye save Method k pehlay chalana: Works as a Middleware:
userSChema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});
//* Define an instance method to generate an authentication token for specific user:instance k sath work hai tu .methods use karna paree gaLwarna .statics:::
//* custom methods add kar saktai schema ma: call on instance of documents:create from that model
userSChema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY); // verify,login kar sakta secret key se etc
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

//* Store the Message:
userSChema.methods.storeMessage = async function (name, email, phone, message) {
  this.messages = this.messages.concat({ name, email, phone, message });
  await this.save();
  return this.messages;
};
// * to Create Collection:
const User = new mongoose.model('USER', userSChema);

module.exports = User;
