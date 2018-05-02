import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  redirects: {
    'nontan' : 'https://pacific-taiga-71002.herokuapp.com'
  }  
});

Router.map(function() {
  this.route('gradeconverter');
  this.route('nontan');
});

export default Router;
