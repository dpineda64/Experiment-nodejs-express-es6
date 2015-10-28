/*jslint node: true , esnext: true*/

// Modules
import Home from './Home/home';


const Router = Backbone.Router.extend({
  initialize: function(el){
    this.el = el;
    //this.homeView = new Home();
  },
  routes: {
    '': 'rootRoute'
  },
  /*
  * Change the active element in the topbar
  */
  setActiveEntry: function(url){
    $('li').removeClass('active');
    $('li a[href="'+ url + '"]').parents('li').addClass('active');
  }
});

const router = new Router($('#content'));

router.on('route:rootRoute', function(){
  this.homeView = new Home();
  this.homeView.render();
});


Backbone.history.start();
