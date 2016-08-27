'use strict';

import * as userCtrl from './../controllers/users';

module.exports = (router) => {

    router.del = router.delete;

    router.get('/trees', userCtrl.get_trees);

    router.post('/user', userCtrl.create_user);
    router.post('/tree', userCtrl.create_tree);

    router.all('*', (req, res, next) => {
        res.status(404).send({ MESSAGE: 'nothing to do here' });
    });


    return router;
};
