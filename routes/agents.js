var express = require('express');
var router = express.Router();
var oracledb = require('oracledb');
var db = require('../db/database');
var checkAuth = require("./check-auth");


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* GET users listing. */
router.get('/:type', checkAuth, function (req, res, next) {
    console.log(req.sessionID);
    console.log(req.session);
    db.execSql({
            sql: "select AGNNAME from v_agnlist where AGNTYPE = :AGNTYPE",
            binds: {
                "AGNTYPE": req.params.type
            },
            getArray: true
        })
        .then(function (params) {
            res.status(200).json(params.dataset.rows);
        })
        .catch(next);
});

module.exports = router;
