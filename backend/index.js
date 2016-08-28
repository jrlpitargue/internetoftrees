import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import winston from 'winston';
import favicom from 'serve-favicon';
import body_parser from 'body-parser';
import compression from 'compression';
import cookie_parser from 'cookie-parser';
import method_override from 'method-override';


import util from './config/util';
import config from './config/config';
import router from './config/router';


let app = express();


app.set('env', config.ENV);
app.set('name', config.APP_NAME);


winston.cli();
winston.level = config.LOG_LEVEL || 'silly';
winston.log('info', 'Starting', config.APP_NAME, 'on', config.ENV, 'environment');


app.use(helmet());
app.set('case sensitive routing', true);
app.set('trust proxy', 1);


winston.log('verbose', 'Binding 3rd-party middlewares');
app.use(morgan('combined', {stream: util.configure_logger(config.LOGS_DIR)}));
app.use(method_override());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(cookie_parser());
app.use(compression());
app.use(express.static(config.ASSETS_DIR));
app.use('/api', router(express.Router()));
app.use('*', (req, res, next) => {
    res.sendFile(__dirname + '../public/index.html');
});

winston.log('info', 'Server listening on port', config.PORT);
app.listen(config.PORT, '0.0.0.0');
