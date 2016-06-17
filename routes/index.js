var express = require('express');
var router = express.Router();
var db = require("../db/database");
/* GET home page. */
router.get('/', function (req, res, next) {
    console.log("index: ");
    console.log(req.session);
    res.render('index', {
        userName: req.session.userFullName,
        mayLogOff: (req.session && req.session.user && req.session.user != "GUEST"),
        pageScript: ["/javascripts/main.js"]
    });
});

router.get('/login', function (req, res, next) {
    res.render('login', {
        pageName: "Вход в систему",
        pageScript: ["/javascripts/login.js","/bower_components/jquery-backstretch/jquery.backstretch.min.js"],
        pageCss: ["/stylesheets/login.css"]
    });
});

router.post('/login', function (req, res, next) {
    db.login({
        username: req.body.username,
        password: req.body.password,
        sessionID: req.sessionID,
        session: req.session
    }).then(function(params){
        res.status(200).json({redirect: (req.session.afterLogin) ? req.session.afterLogin: "/" });
    }).catch(function(error){
        var mess = error.message.match(/ORA\-\d\d\d\d\d\: (.*)\n/);
        res.status(401).send(mess[1]);
    });


    //res.status(401).json({errorMessage: "Капец, ті лошара!"});
});

function logoff(req, res, next) {
    db.logoff({
        sessionID: req.sessionID
    }).then(function () {
        req.session.destroy(function(err) {
            res.status(200).redirect('/');
        });
    }).catch(next);
}

router.all("/logoff", logoff );

module.exports = router;
