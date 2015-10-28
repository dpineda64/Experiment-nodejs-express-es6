/* jshint node: true , esnext: true*/

import route from './routes';

module.exports = (app) => {
  app.use('/admin/', route);
};
