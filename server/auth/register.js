'use strict';

var create_user = require('./../db/create_user').create_user;

module.exports = function (req, res) {
    if (req.body) {
        create_user(req, res);
    } else {
        res.json({
            error: "No data provided"
        })
    }
};