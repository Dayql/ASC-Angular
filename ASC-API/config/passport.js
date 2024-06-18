const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const db = require('../config/database')
require('dotenv').config()

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JwtStrategy(options, async (jwt_payload, done) => {


  try {
    const user = await db.User.findByPk(jwt_payload.id)
    if (user) {
      // console.log('User found')
      return done(null, user)
    } else {
      // console.log('User not found') 
      return done(null, false)
    }
  } catch (error) {
    console.log('Error during authentication:', error)
    return done(error, false)
  }
}));

module.exports = passport;
