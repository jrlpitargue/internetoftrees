'use strict';

import shell     from 'python-shell';
import winston   from 'winston';
import fs        from 'fs';

import config    from './../config/config';
import util      from './../helpers/util';

exports.get_tree_type = (req, res, next) => {

    function start () {
        let dirname = __dirname + '/../../classify_image.py';
        let python = require("child_process").spawn(
            'python',
            [dirname, 'uploads/image.jpg']
        );
        let output = '';
        let response;

        python.stdout.on('data', (data) => {
            output += data;
            output = output.split('\n')[1];

            response = {
                type: output.substr(0, output.length-9),
                value: output.substr(-7,5),
                match: parseFloat(output.substr(-7,5), 10) > 0.95
            }
        });

        python.on('close', (code) => { 
            if (code !== 0) {  
                return res.status(500).send({ERROR: 'Server error'}); 
            }
            return res.status(200).send(response);
        });
    }

    start();
};
