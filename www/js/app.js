// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic-material','ionicLazyLoad', 'starter.controllers','starter.services','starter.routes','firebase','ngCordova', 'ngCordovaOauth'])

.run(function($ionicPlatform,$rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    if(window.Connection) {
       if(navigator.connection.type == Connection.NONE) {
         $ionicPopup.confirm({
           title: 'No Internet Connection',
           content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
         })
         .then(function(result) {
           if(!result) {
             ionic.Platform.exitApp();
           }
         });
       }
     }

    // for form inputs)
    $rootScope.uid="vhnG9DwMjpVa18wEDnYsmCh8Jau1";
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});
