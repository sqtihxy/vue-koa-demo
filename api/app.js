/*
* @Author: fengyun2
* @Date:   2016-05-12 17:43:55
* @Last Modified by:   fengyun2
* @Last Modified time: 2016-05-14 08:32:02
*/

'use strict';

var path = require('path');

var koa = require('koa');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');
var session = require('koa-generic-session');
var sessionStore = require('koa-session-mongoose');

var config = require('./config/config');
// var backendRoutes = require('./app/routes/backend');
var frontendRoutes = require('./app/routes/frontend');
// var response = require('./app/middlewares/response');
var db = require('./db/db');

// var errorHandler = require('./app/middlewares/error');

let app = koa();

let frontendRouter = new Router();

// app.use(errorHandler());

app.use(function* (next) {
  console.log(this.url);
  yield next;
});


app.keys = ['koa', 'blog'];

app.use(session({
  store: sessionStore.create(),
  collection: 'koaSessions',
  connection: db,
  expires: 30 * 60 * 1000,
  model: 'KoaSession'
}));

// app.use(bodyParser());
app.use(bodyParser()).
use(frontendRouter.routes())
.use(frontendRouter.allowedMethods());

frontendRoutes(frontendRouter);

app.listen(config.PORT);
