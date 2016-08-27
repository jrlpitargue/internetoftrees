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

        python.stdout.on('data', (data) => {
            output += data;
        });

        python.on('close', (code) => { 
            if (code !== 0) {  
                return res.status(500).send(code); 
            }
            return res.status(200).send(output);
        });
    }

    start();
};
