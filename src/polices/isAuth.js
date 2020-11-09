function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(200).json('You have not logined up.');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.status(200).json('You have already logined up.');
    }
    return next();
}

module.exports = {
    checkAuthenticated,
    checkNotAuthenticated,
};
