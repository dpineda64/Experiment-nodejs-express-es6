/*jslint esnext: true*/

import tpl from '../template';
import HomeCollection from './_collection';

const Home = Backbone.View.extend({
  template: './templates/home',
  /*
  * Initialize
  */
  initialize: function(options){
    const that = this;
    this.collection = new HomeCollection();
    this.collection.fetch({
      success: function(){
        that.render();
      }
    });
  },
  el : '.content',
  render: function(){
    const that = this,
          template = tpl.get(this.template, function(markup) {
            const loadedTemplate = _.template(markup, {} );
            that.$el.html( loadedTemplate({posts: that.collection.toJSON()}) );
          });
    return this;
  }
});

export default Home;
