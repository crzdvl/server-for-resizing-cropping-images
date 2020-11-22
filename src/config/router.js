const express = require('express');
const http = require('http');

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
         * Forwards any requests to the /v1/image URI to ImageRouter.
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
            res.status(404).send(http.STATUS_CODES[404]);
        });

        /**
         * @function
         * @inner
         * @param {express.Router}
         */
        app.use(router);
    },
};
