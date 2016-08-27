'use strict';

module.exports = (router) => {

    router.del = router.delete;

    router.all('*', (req, res, next) => {
        res.status(404).send({ MESSAGE: 'nothing to do here' });
    });


    return router;
};