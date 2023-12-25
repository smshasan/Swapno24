const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const GithubStrategy = require("passport-github2").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");

const User = require("./models/user")

const GOOGLE_CLIENT_ID =
  "1014577208458-1sjl2jcaqntovik3c3oknrkvrk62031k.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

GITHUB_CLIENT_ID = "your id";
GITHUB_CLIENT_SECRET = "your id";

FACEBOOK_APP_ID = "your id";
FACEBOOK_APP_SECRET = "your id";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    // function (accessToken, refreshToken, profile, done) {
    //   done(null, profile);
    // }

    function (accessToken, refreshToken, profile, cb) {
      User.findOne({ googleId: profile.id }, (err, user) => {
        if (err) return cb(err, null);

        // not a user; so create a new user with new google id
        if (!user) {
          let newUser = new User({
            googleId: profile.id,
            name: profile.displayName,
            image: profile.photos[0].value
          });
          newUser.save();
          return cb(null, newUser);
        } else {
          // if we find an user just return return user
          return cb(null, user);
        }
      });
    }
  )
);

// passport.use(
//   new GithubStrategy(
//     {
//       clientID: GITHUB_CLIENT_ID,
//       clientSecret: GITHUB_CLIENT_SECRET,
//       callbackURL: "/auth/github/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: FACEBOOK_APP_ID,
//       clientSecret: FACEBOOK_APP_SECRET,
//       callbackURL: "/auth/facebook/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// create session id
// whenever we login it creates user id inside session
passport.serializeUser((user, done) => {
  done(null, user.id);
  // done(null, user);
});

// find session info using session id
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });


