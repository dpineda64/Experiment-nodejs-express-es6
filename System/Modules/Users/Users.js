'use strict';

module.exports = (app) => {
  const routes = require('./routes');
  app.use('/users/', routes);
}
