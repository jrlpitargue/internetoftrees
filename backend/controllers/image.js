'use strict';

import shell     from 'python-shell';
import winston   from 'winston';
import fs        from 'fs';

import config    from './../config/config';
import util      from './../helpers/util';
import Firebase  from './../lib/init';

exports.get_tree_type = (req, res, next) => {

    function start () {
        let dirname = __dirname + '/../../classify_image.py';
        let python = require("child_process").spawn(
            'python',
            [dirname, 'uploads/image.jpg']
        );
        let output = '';
        let response;
        let type = '';
        if (typeof req.file === 'undefined') {
            return res.status(400).send({ MESSAGE: 'No image sent!' });
        }

        console.log(req.file);

        python.stdout.on('data', (data) => {
            output += data;
            output = output.split('\n')[1];
            type = output.substr(0, output.length-9);

            response = {
                type: type,
                value: output.substr(-7,5),
                match: parseFloat(output.substr(-7,5), 10) > 0.95
            }

            const ref = Firebase.database().ref('trees');

            ref.on('value', (data) => {
                let trees = data.val();

                for (let key in trees) {
                    let tree = trees[key];

                    if (tree.name.toLowerCase() === type.toLowerCase()) {
                        response['familyName'] = tree.familyName || null;
                        response['notes'] = tree.notes || null;
                        response['endangered'] = tree.status.endangered || false;
                        response['invasive'] = tree.status.invasive || false;
                        response['wiki'] = tree.wiki || '#';
                    }
                }
            });
        });

        python.on('close', (code) => { 
            if (code !== 0) {  
                return res.status(500).send({ERROR: 'Server error'}); 
            }
            console.log(response);
            return res.status(200).send(response);
        });
    }

    start();
};
