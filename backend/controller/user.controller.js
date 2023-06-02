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

module.exports = {
  register
}
