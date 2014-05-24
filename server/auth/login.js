'use strict';
var passport = require('./../server').passport;
module.exports = function (req, res) {
    passport.authenticate('local', function (err, user) {
        if (req.body) {
            if (err) {
                return res.json({ error: err.message });
            }
            if (!user) {
                return res.json({ error: "You shall not pass..."});
            }
            req.login(user, {}, function (err) {
                if (err) {
                    return res.json({error: err});
                }
                return res.json(
                    { user: {
                        id: req.user.id,
                        email: req.user.email,
                        joined: req.user.joined
                    },
                        success: true
                    });
            });
        } else {
            if (err) {
                return res.redirect('/');
            }
            if (!user) {
                return res.redirect('/login');
            }
            req.login(user, {}, function (err) {
                if (err) {
                    return res.redirect('/');
                }
                return res.redirect('/');
            });
        }
    })(req, res);
};