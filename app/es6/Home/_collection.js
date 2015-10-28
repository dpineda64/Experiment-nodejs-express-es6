/* jshint esnext: true */

const Profile = Backbone.Model.extend();

const HomeCollection = Backbone.Collection.extend({
  model: Profile,
  url: 'http://192.168.0.35:3040/show',
  parse: function(response){
    return response;
  },
  sync: function(method, model, options){
    const that = this;
    const params = _.extend({
      type: 'GET',
      dataType: 'json',
      url: that.url,
      processData: false
    }, options);

    return $.ajax(params);
  }
});

export default HomeCollection;
