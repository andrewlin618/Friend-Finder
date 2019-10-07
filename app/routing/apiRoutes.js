var express = require('express');
var router = express.Router();
fs = require('fs');

var friendsList = require('../data/friends.js');

router.get('/friends', function (req, res) {
    res.send(friendsList);
});



router.post('/friends', function (req, res) {
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
    friendsList.push(user);
    friendsList.push(bestMatch);
    fs.writeFileSync('../data/friends.js',friendsList,{encoding:'utf8',flag:'w'});
    
    
    // })

    // function reduceFunction(total, num) {
    //     return total + num;


});
module.exports = router;