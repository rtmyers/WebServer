require('dotenv').config({ silent: true });

const app = require('express')();

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import parseurl from 'parseurl';
import session from 'express-session';
import passport from 'passport';
import graphql from 'express-graphql';
import Auth0Strategy from 'passport-auth0';
import uuid from 'uuid/v4';
import cors from 'cors';
import './server/config/babel_polyfill';
import Config from './server/config/config.json';

//import webpackConfig from './webpack.server.config';

// connect to db
require('./server/db/mongoose')().catch(err => app.next(err));

// setting open cors policy here, add rules before production build
app.use('*', cors());

app.use(require('morgan')('dev'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
	genid: (req) => {
		console.log('Inside the session middleware');
		console.log(req.sessionID);
		return uuid(); // use UUIDs for session IDs
	},
	secret: Config.secret,//'GuildEducationSecret',
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', cors(), graphql({
	schema: require('./server/graphql').userSchema,
	rootValue: global,
	graphiql: true
}));

//app.use(webpackMiddleware(webpack(webpackConfig)));

app.listen(Config.port, () => console.log(`BFF listening on port ${Config.port}`));

app.use((err, req, res) => {
	console.warn(err);
  res.status(err.status || 500);
  res.json({
  	errors: {
      	message: err.message,
      	error: err,
    	}
  });
	res.end();
});

module.exports = app;
