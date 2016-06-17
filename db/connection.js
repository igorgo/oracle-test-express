/**
 * Created by igor-go on 17.05.2016.
 */
var oracledb = require('oracledb');
var connection;

oracledb.getConnection({
    user: "NODE",
    password: "node",
    connectString: "UDP"
}, function (err, conn) {
    if (err) console.log(err);
    else connection = conn;
});

module.exports = connection;