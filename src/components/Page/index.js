/**
 * @function signUp
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns {Promise < void >}
 */
function signUp(req, res) {
    return res.render('signup.ejs', {
        csrfToken: req.csrfToken(),
    });
}

/**
 * @function logIn
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns {Promise < void >}
 */
function logIn(req, res) {
    return res.render('login.ejs', {
        csrfToken: req.csrfToken(),
        error: '',
    });
}

/**
 * @function editor
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns {Promise < void >}
 */
function editor(req, res) {
    return res.render('editor.ejs', {
        error: '',
        name: req.user.firstName,
        csrfToken: req.csrfToken(),
        image: '',
    });
}

/**
 * @function history
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns {Promise < void >}
 */
function history(req, res) {
    const data = [{ CropTotal: 3, ResizeTotal: 2, SizeAvg: 5.6 }, { CropTotal: 3, ResizeTotal: 2, SizeAvg: 5.6 }];

    return res.render('history.ejs', {
        history: data,
    });
}

/**
 * @function menu
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns {Promise < void >}
 */
function menu(req, res) {
    return res.render('menu.ejs', {
        name: req.user.firstName,
    });
}

/**
 * @function historyByEmail
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns {Promise < void >}
 */
function historyByEmail(req, res) {
    return res.render('historyByEmail.ejs', {
        csrfToken: req.csrfToken(),
        name: req.user.firstName,
        message: 'average statistic of params operations grouped in days for one user',
        user: '',
        history: '',
    });
}

/**
 * @function historyByDate
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns {Promise < void >}
 */
function historyByDate(req, res) {
    return res.render('historyByDate.ejs', {
        csrfToken: req.csrfToken(),
        name: req.user.firstName,
        message: 'history of image operations with a specified time',
        history: '',
    });
}

module.exports = {
    signUp,
    logIn,
    editor,
    history,
    menu,
    historyByEmail,
    historyByDate,
};
