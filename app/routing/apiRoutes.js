var express = require('express');
var router = express.Router();
var fs = require('fs');

var friendsList = require('../data/friends.js');

router.get('/friends', function (req, res) {
    res.send(friendsList);
});

router.post('/friends', function (req, res) {
    var realScore = req.body.scores;
    for (var i =0;i<realScore.length;i++){
        realScore[i] = parseInt(realScore[i])
    }
    console.log(realScore);
    var user = {
        name: req.body.name,
        photo: req.body.photo,
        scores: req.body.scores
    };

    var bestMatch = friendsList[0];

    function totalDifference(friend1, friend2) {
        var sum = 0;
        for (var i = 0; i < friend1.scores.length; i++) {
            a = friend1.scores[i] - friend2.scores[i];
            if (a < 0) {
                a = -a;
            }
            sum += a;
        }
        return sum;
    }

    for (var i = 0; i < friendsList.length; i++) {
        if (totalDifference(friendsList[i], user) < totalDifference(bestMatch, user)) {
            bestMatch = friendsList[i];
        }
    }

    res.send(bestMatch);
    friendsList.push(user);
    console.log(friendsList);
    // fs.writeFile('../data/friends.js', friendsList, function (err) {
    //     if (err) throw err;
    //     console.log('Replaced!');
    // });
    // fs.appendFile('../data/friends.js', '', function (err) {
    //     if (err) throw err;
    //     console.log('Appended!');
    // });


});

module.exports = router;