'use strict';

// Index route
module.exports.index = function (req, res) {
    console.log("INDEXXXX");
    console.log(req.user);
    res.render('base.html', {
        user: req.user
    });
};
module.exports.notFound = function (req, res) {
    res.render('404.html');
};