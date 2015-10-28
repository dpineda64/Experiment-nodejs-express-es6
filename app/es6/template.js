/* jshint esnext: true */

let tpl = {
  templates: {},
  get: function(id, callback){
    const template = this.templates[id];
    if (template) {
      callback(template);
    } else {
      const that = this;
      $.get(id+'.html', function(template){
        that.templates[id] = template;
        callback(that.templates[id]);
      });
    }
  }
};

export default tpl;
