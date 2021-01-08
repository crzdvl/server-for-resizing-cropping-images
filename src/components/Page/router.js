const { Router } = require('express');
const PageComponent = require('.');

const isAuth = require('../../polices/isAuth');

/**
 * Express router to mount books related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route for page
 * @name /v1/page/signup
 */
router.get('/signup', isAuth.checkNotAuthenticated, PageComponent.signUp);

/**
 * Route for page
 * @name /v1/page/history
 */
router.get('/history', isAuth.checkAuthenticated, PageComponent.history);
/**
 * Route for page
 * @name /v1/page/login
 */
router.get('/login', isAuth.checkNotAuthenticated, PageComponent.logIn);

/**
 * Route for page
 * @name /v1/page/editor
 */
router.get('/editor', isAuth.checkAuthenticated, PageComponent.editor);

/**
 * Route for page
 * @name /v1/page/menu
 */
router.get('/menu', isAuth.checkAuthenticated, PageComponent.menu);

/**
 * Route for page
 * @name /v1/page/historyByEmail
 */
router.get('/historyByEmail', isAuth.checkAuthenticated, PageComponent.historyByEmail);

/**
 * Route for page
 * @name /v1/page/historyByDate
 */
router.get('/historyByDate', isAuth.checkAuthenticated, PageComponent.historyByDate);

module.exports = router;
