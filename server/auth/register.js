'use strict';

var create_user = require('./../db/create_user').create_user;

module.exports = function (req, res) {
    if (req.body) {
        res.json(create_user(req.body));
    } else {
        res.json({
            error: "No data provided"
        })
    }
};