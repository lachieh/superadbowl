const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const models = require('../models');

function setupAuth(app) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.APP_URL}/api/user/login/callback`,
  },
  ((token, tokenSecret, profile, done) => {
    models.User.findOrCreate({
      where: {
        google: profile.id,
      },
      defaults: {
        name: profile.name.givenName,
        google: profile.id,
        email: profile.email,
      },
    })
      .then(user => done(null, user[0]));
  })));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    models.User.findByPk(id).then((user) => {
      done(null, {
        id: user.id,
        name: user.name,
      });
    }).catch(done);
  });

  app.use(passport.initialize());

  app.use(passport.session());

  app.get('/api/user/login',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

  app.get('/api/user/login/callback',
    passport.authenticate('google', { failureRedirect: '/api/user/login' }),
    (req, res) => {
      res.redirect('/');
    });

  app.get('/api/user/logout',
    (req, res) => {
      req.logout();
      res.redirect('/');
    });
}

module.exports = setupAuth;
