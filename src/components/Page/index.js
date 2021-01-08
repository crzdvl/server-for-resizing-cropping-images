function signUp(req, res) {
    return res.render('signup.ejs', {
        csrfToken: req.csrfToken(),
    });
}

function logIn(req, res) {
    return res.render('login.ejs', {
        csrfToken: req.csrfToken(),
        error: '',
    });
}

function editor(req, res) {
    return res.render('editor.ejs', {
        error: '',
        name: req.user.firstName,
        csrfToken: req.csrfToken(),
        image: '',
    });
}

function history(req, res) {
    const data = [{ CropTotal: 3, ResizeTotal: 2, SizeAvg: 5.6 }, { CropTotal: 3, ResizeTotal: 2, SizeAvg: 5.6 }];

    return res.render('history.ejs', {
        history: data,
    });
}

function menu(req, res) {
    return res.render('menu.ejs', {
        name: req.user.firstName,
    });
}

function historyByEmail(req, res) {
    return res.render('historyByEmail.ejs', {
        csrfToken: req.csrfToken(),
        name: req.user.firstName,
        message: 'average statistic of params operations grouped in days for one user',
        user: '',
        history: '',
    });
}

function historyByDate(req, res) {
    return res.render('historyByDate.ejs', {
        csrfToken: req.csrfToken(),
        name: req.user.firstName,
        message: 'history of image operations with a specified time',
        history: '',
        current: 0,
        pages: 0,
        input: {
            dateStart: '',
            dateFinish: '',
            email: '',
        },
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
