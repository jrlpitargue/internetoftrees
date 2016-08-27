'use strict';

import config    from './../config/config'
import util      from './../helpers/util';
import Firebase  from './../lib/init';

exports.create_user = (req, res, next) => {
    const data = util.get_data(
        {
            email: '',
            username: '',
            password: ''
        },
        req.body
    );
    const ref = Firebase.database().ref();

    function start() {
        if (data instanceof Error) {
            return res.status(400).send({message: data.message});
        }

        ref.child('users').push(data);

        res.status(200).send({message: 'OK'});
    }

    start();
};

exports.create_tree = (req, res, next) => {
    const data = util.get_data(
        {
            treeType: '',
            lat: '',
            lng: ''
        },
        req.body
    );
    const ref = Firebase.database().ref();

    function start() {
        if (data instanceof Error) {
            return res.status(400).send({message: data.message});
        }

        ref.child('trees').push(data);

        res.status(200).send({message: 'OK'});
    }

    start();
}

exports.get_trees = (req, res, next) => {
    const ref = Firebase.database().ref('trees');
    function start() {
        ref.on('value', function(data) {
            console.log(data.val())
        });

        res.status(200).send({message: 'OK'});
    }

    start();
}
