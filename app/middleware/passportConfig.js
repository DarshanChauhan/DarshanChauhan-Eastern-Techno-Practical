// // config/passportConfig.js
// const passport = require("passport");
// const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
// const { User, Sessions } = require("../models"); 
// require("dotenv").config();

// const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// // JWT strategy options
// const opts = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: JWT_SECRET,
// };

// // JWT strategy implementation
// passport.use(
//   new JwtStrategy(opts, async (jwt_payload, done) => {
//     try {
//       // Check if the token is in the Sessions table
//       const session = await Sessions.findOne({ where: { token: jwt_payload.token } });
//       if (!session) {
//         return done(null, false);
//       }

//       // Find the user by ID
//       const user = await User.findByPk(jwt_payload.id);
//       if (!user) {
//         return done(null, false);
//       }

//       // Token and user are valid
//       return done(null, user);
//     } catch (err) {
//       return done(err, false);
//     }
//   })
// );

// module.exports = passport;


// Note : not in use but just for clarification