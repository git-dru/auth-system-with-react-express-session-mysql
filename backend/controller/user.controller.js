const httpStatus = require('http-status')
const bcrypt = require('bcrypt')
const db = require('../models')
const User = db.user

async function register(req, res) {
  try {

    const { email, password, username } = req.body

    const userByEmail = await User.findOne({
      where: {
        email
      },
      raw: true,
    })

    const userByUserName = await User.findOne({
      where: {
        username
      },
      raw: true,
    })

    if (userByEmail) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: 'This email already taken',
      })
    }

    if (userByUserName) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: 'This Username already taken',
      })
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await User.create({
      username,
      email,
      password: hashedPassword,
    })
    req.session.user = { email }
    return res.status(httpStatus.OK).json({
      success: true,
      result: { email },
      messge: 'Registered successfully! Please check your email'
    })
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: 'false',
      message: 'Internal Server Error',
    })
  }
}

async function login(req, res) {
  try {

    const email = req.body.email
    const password = req.body.password

    const hashedPassword = await bcrypt.hash(
      password,
      12,
    );

    const user = await User.findOne({
      where: { email },
      raw: true,
    })

    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: 'false',
        message: 'User not found',
      })
    }

    if (!user.password) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: 'false',
        message: 'Wrong Password',
      })
    }

    const passwordsMatch = await bcrypt.compare(password, user.password)

    if (!passwordsMatch) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: 'false',
        message: 'Password not matched',
        data: [password, user.password, hashedPassword]
      })
    }

    const data = {
      user: {
        id: user.id,
        email: user.email,
      },
    }
    req.session.user = { email }
    return res.status(httpStatus.OK).json({
      success: true,
      result: { email },
    })
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: 'false',
      message: 'Internal Server Error:' + error.message,
    })
  }
}

async function logout(req, res) {
  req.session.destroy(function (err) {
    if (err) throw err;
    res.send("You have been logged out of your session. Please login to contiune");

  });
}
module.exports = {
  register,
  login,
  logout
}
