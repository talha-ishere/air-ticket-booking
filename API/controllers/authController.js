const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
  });

  // Remove password from output
  user.password = undefined;

  res.status(200).json({
    status: true,
    token,
    data: {
      user,
    },
  });
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      throw new Error("Please must write Email and Password");
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("No user find with this email");
    }

    // if (!(await user.correctPassword(password, user.password))) {
    //   throw new Error("Incorrect Password");
    // }
    const result = await user.correctPassword(password, user.password);
    console.log(result);
    // console.log(result);
    if (!result) {
      throw new Error("Password is incorrect");
    }

    // 3) If everything ok, send token to client
    if (result) {
      createSendToken(user, 200, req, res);
    }
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};

exports.signup = async (req, res, next) => {
  try {
    // const data = req.body;

    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      throw new Error("E11000 duplicate err ");
    }
    if (!user) {
      const newUser = await User.create(req.body);
      createSendToken(newUser, 201, req, res);
    }
    // const url = `${req.protocol}://${req.get("host")}/me`;
    // await new Email(newUser, url).sendWelcome();
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};
