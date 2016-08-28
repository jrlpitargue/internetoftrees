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
    const data = {
            name: req.body.name,
            familyName: req.body.familyName,
            lat: req.body.lat,
            lng: req.body.lng,
            disease: req.body.disease || null,
            wildlife: req.body.wildlife || null,
            notes: req.body.notes || null
    }

    const ref = Firebase.database().ref();
    console.log(data);
    function start() {
        if (data instanceof Error) {
            return res.status(400).send({message: data.message});
        }

        data.status = {};
        data.status['endangered'] = req.body.endangered || false;
        data.status['invasive'] = req.body.invasive || false;

        ref.child('trees').push(data);

        res.status(200).send(data);
    }

    start();
}

exports.get_trees = (req, res, next) => {
    const ref = Firebase.database().ref('trees');
    function start() {
        let trees = [];
        ref.on('value', function(data) {
            trees.push(data.val());
        });

        if(trees.length == 0) {
            return res.status(404).send({
                message: 'No tree data found'
            });
        }

        return res.status(200).send(trees);
    }

    start();
}
