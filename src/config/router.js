const express = require('express');
const http = require('http');

const PageRouter = require('../components/Page/router');
const AuthRouter = require('../components/Auth/router');
const ImageRouter = require('../components/Image/router');
const HistoryRouter = require('../components/History/router');

const { handleError } = require('../error/handleError');

module.exports = {
    /**
     * @function
     * @param {express.Application} app
     * @summary init Application router
     * @returns void
     */
    init(app) {
        const router = express.Router();

        /**
         * Forwards any requests to the /v1/page URI to PageRouter.
         * @name /v1/auth
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        app.use('/v1/page', PageRouter);

        /**
         * Forwards any requests to the /v1/auth URI to AuthRouter.
         * @name /v1/auth
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        app.use('/v1/auth', AuthRouter);

        /**
         * Forwards any requests to the /v1/image URI to ImageRouter.
         * @name /v1/image
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        app.use('/v1/image', ImageRouter);

        /**
         * Forwards any requests to the /v1/history URI to HistoryRouter.
         * @name /v1/history
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        app.use('/v1/history', HistoryRouter);

        /**
        * @description Error handler
        * @function
        * @inner
        * @param {callback} middleware - Express middleware.
        */
        app.use((err, req, res, next) => {
            handleError(err, res);
        });

        /**
         * @description No results returned mean the object is not found
         * @function
         * @inner
         * @param {callback} middleware - Express middleware.
         */
        app.use((req, res) => {
            res.render('404.ejs');
        });

        /**
         * @function
         * @inner
         * @param {express.Router}
         */
        app.use(router);
    },
};
