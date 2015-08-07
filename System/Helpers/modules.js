'use strict';

const fs = require('fs');

module.exports = (app , config) => {
  class Modules {
    constructor(modules){
      // Classname
      this.name = 'Modules Loader';
      // intaller json
      const i = './System/modules.json';
      let installer = fs.readFileSync(i, 'utf-8', (err, data) => {
        if (err){
          throw err;
        }
        return data;
      });
      installer = JSON.parse(installer);
      this.modules = installer.modules;
    }
    init(){
      const installed = this.modules;
      for(var key in installed){
        require(config.SystemPath +  '/Modules/' + installed[key] + '/' + installed[key])(app);
      }
    }
  }
  class InstallModules extends Modules {
    constructor(){
      super();
    }
  }
  const modules = new Modules();
  modules.init();
}
