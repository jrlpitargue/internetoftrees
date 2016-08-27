'use strict';

import multer    from 'multer';

import * as userCtrl from './../controllers/users';
import * as imageCtrl from './../controllers/image';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, 'image.jpg')
    }
})

const upload = multer({ storage: storage });

module.exports = (router) => {

    router.del = router.delete;

    router.get('/trees', userCtrl.get_trees);
    router.post('/tree', userCtrl.create_tree);
    router.post('/user', userCtrl.create_user);
    router.post('/image', upload.single('image'), imageCtrl.get_tree_type);

    router.all('*', (req, res, next) => {
        res.status(404).send({ MESSAGE: 'nothing to do here' });
    });


    return router;
};
