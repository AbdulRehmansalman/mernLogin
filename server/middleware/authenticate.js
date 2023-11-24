const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwttoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    // TODO: verifytoken:user ke details a gye hai: aus details se user ka data get kar sakta:
    const rootuser = await User.findOne({
      _id: verifyToken._id,
      'tokens.token': token,
    }); // user available hai:
    if (!rootuser) {
      throw new Error('User Not Found');
    }
    req.token = token;
    req.rootUser = rootuser;
    req.userId = rootuser._id;
    next();
  } catch (err) {
    res.status(401).send('UnAuthorized !! nO ToKEN provided ');
    console.log(err);
  }
};
module.exports = authenticate;
