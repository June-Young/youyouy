/* eslint no-alert: 0 */

'use strict';

//
// Here is how to define your module
// has dependent on mobile-angular-ui
//
var app = angular.module('YouyouWebapp', [
  'ngRoute',
  'mobile-angular-ui',
  // touch/drag feature: this is from 'mobile-angular-ui.gestures.js'.
  // This is intended to provide a flexible, integrated and and
  // easy to use alternative to other 3rd party libs like hammer.js, with the
  // final pourpose to integrate gestures into default ui interactions like
  // opening sidebars, turning switches on/off ..
  'mobile-angular-ui.gestures'
  , 'ngTouch'
]);

app.run(function ($transform) {
  window.$transform = $transform;
});

//
// You can configure ngRoute as always, but to take advantage of SharedState location
// feature (i.e. close sidebar on backbutton) you should setup 'reloadOnSearch: false'
// in order to avoid unwanted routing.
//
app.config(function ($routeProvider) {
  $routeProvider.when('/home_weather', {
    templateUrl: '/youyou/pages/home_weather.html',
    controller: 'WeatherController',
    reloadOnSearch: false
  });
  // $routeProvider.when('/', {templateUrl: '/youyou/home.html', reloadOnSearch: false, controller: 'MainController'});
  $routeProvider.when('/login', {templateUrl: '/youyou/pages/login.html', controller: 'login', reloadOnSearch: false});
  $routeProvider.when('/nickname', {templateUrl: '/youyou/pages/nickname.html', controller: 'nickname', reloadOnSearch: false});
  $routeProvider.when('/chattinglist', {templateUrl: '/youyou/pages/chatting-list.html', controller: 'chattinglist', reloadOnSearch: false});
  $routeProvider.when('/chattingroom', {templateUrl: '/youyou/pages/chatting-room.html', controller: 'chattingroom', reloadOnSearch: false});
  $routeProvider.when('/skMap', {templateUrl: '/youyou/pages/skMap.html', controller: 'SkMapController', reloadOnSearch: false});
  $routeProvider.when('/googleMap', {templateUrl: '/youyou/pages/googleMap.html', controller: 'GoogleMapController', reloadOnSearch: false});
  $routeProvider.when('/home_weather', {templateUrl: '/youyou/pages/home_weather.html', controller: 'WeatherController', reloadOnSearch: false});
  $routeProvider.when('/language', {templateUrl: '/youyou/pages/language.html', controller: 'LanguageController', reloadOnSearch: false});
  $routeProvider.when('/welcome', {templateUrl: '/youyou/pages/welcome.html', controller: 'WelcomeController', reloadOnSearch: false});
  $routeProvider.when('/country', {templateUrl: '/youyou/pages/country.html', controller: 'CountryController', reloadOnSearch: false});
  $routeProvider.when('/logout', {templateUrl: '/youyou/pages/logout.html', controller: 'LogoutController', reloadOnSearch: false});
  $routeProvider.when('/youyoulist', {templateUrl: '/youyou/pages/youyou-list.html', controller: 'YouyouListController', reloadOnSearch: false});
  $routeProvider.when('/youyouprofile', {templateUrl: '/youyou/pages/youyou-profile.html', controller: 'YouyouProfileController', reloadOnSearch: false});
  $routeProvider.when('/home', {templateUrl: '/youyou/pages/home.html', controller: 'HomeController', reloadOnSearch: false});
  $routeProvider.when('/profile', {templateUrl: '/youyou/pages/profile.html', controller: 'ProfileController', reloadOnSearch: false});
  $routeProvider.when('/tourApi', {templateUrl: '/youyou/pages/tourApi.html', controller: 'TourApiController', reloadOnSearch: false});
  $routeProvider.when('/gallery', {templateUrl: '/youyou/pages/gallery.html', controller: 'GalleryController', reloadOnSearch: false});
  $routeProvider.when('/question', {templateUrl: '/youyou/pages/question.html', controller: 'QuestionController', reloadOnSearch: false});
  $routeProvider.when('/thankyou', {templateUrl: '/youyou/pages/thankyou.html', controller: 'ThankyouController', reloadOnSearch: false});
  $routeProvider.when('/youyou-info', {templateUrl: '/youyou/pages/youyou-info.html', controller: 'YouyouInfoController', reloadOnSearch: false});
  $routeProvider.when('/agreement', {templateUrl: '/youyou/pages/agreement.html', controller: 'AgreementController', reloadOnSearch: false});
  $routeProvider.when('/settings', {templateUrl: '/youyou/pages/settings.html', controller: 'SettingsController', reloadOnSearch: false});
  $routeProvider.when('/test', {templateUrl: '/youyou/pages/test.html', controller: 'TestController', reloadOnSearch: false});
});
