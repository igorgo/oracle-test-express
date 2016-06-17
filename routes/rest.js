/**
 * Created by igor-go on 20.05.2016.
 */
var express = require('express');
var router = express.Router();
var db = require("../db/database");

router.get("/releaseinfo/:type", function (req, res, next) {
    db.execProc({
        sql: "begin\n" +
        "  udo_package_nodeweb_iface.get_release_info(p_sessid => :p_sessid,\n" +
        "                                             p_rel_type => :p_rel_type,\n" +
        "                                             p_rel_name => :p_rel_name,\n" +
        "                                             p_rel_codename => :p_rel_codename,\n" +
        "                                             p_last_build => :p_last_build,\n" +
        "                                             p_last_date => :p_last_date);\n" +
        "end;",
        binds: {
            p_sessid: {dir: db.BIND_IN, type: db.STRING, maxSize: 255, val: req.sessionID},
            p_rel_type: {dir: db.BIND_IN, type: db.STRING, maxSize: 255, val: req.params.type === "stable" ? "S" : "B"},
            p_rel_name: {dir: db.BIND_OUT, type: db.STRING, maxSize: 255},
            p_rel_codename: {dir: db.BIND_OUT, type: db.STRING, maxSize: 255},
            p_last_build: {dir: db.BIND_OUT, type: db.STRING, maxSize: 255},
            p_last_date: {dir: db.BIND_OUT, type: db.DATE}
        }
    }).then(function (params) {
            res.status(200).json(params.results);
        }
    ).catch(next);
});

module.exports = router;