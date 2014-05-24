'use strict';

module.exports = function (req, res) {
    console.log('Wylogowanie...');
    req.logout();
    res.redirect('/login');
};
