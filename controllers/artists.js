/**
 * Created by Владелец on 12.12.2019.
 */
var Artists = require('../models/artists');

exports.all = function (req, res) {
    Artists.all(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(docs);
    })
};


exports.findById = function (req, res) {
    Artists.findById(req.params.id, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(doc);
    })
};

exports.create = function (req, res) {
    var artist = {
        name: req.body.name
    };
    Artists.create(artist, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(artist);
    })
};