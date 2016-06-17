/**
 * Created by igor-go on 18.05.2016.
 */
var checkAuth = function(req, res, next) {
    if (req.session && req.session.user && req.session.user != "GUEST")
        return next();
    else
        //return res.sendStatus(401);
        //console.log(req.originalUrl);
    req.session.afterLogin = req.originalUrl;
    return res.status(401).redirect('/login');
};

module.exports = checkAuth;