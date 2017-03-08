angular.module('starter.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('tabsController', {
    url: '/tablogin1',
    templateUrl: 'templates/tablogin1.html',
    abstract:true
  })

  .state('tabsController.login', {
    url: '/login',
    views: {
      'tab1': {
        templateUrl: 'templates/login.html',
        controller:'ctrllogin'
      }
    }
  })
  .state('tabsController.signup', {
    url: '/signup',
    views: {
      'tab2': {
        templateUrl: 'templates/signup.html',
        controller:'ctrlsignUp'
      }
    }
  })

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller:'AppCtrl'
      }
    }
  })

  .state('app.files', {
    url: '/files/',
    params:{
      catid:null,
      catname:null
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/files.html',
        controller:'Fileview'
      }
    }
  })

  .state('app.albums', {
    url: '/albums',
    views: {
      'menuContent': {
        templateUrl: 'templates/albums.html',
        controller:'ctrlalbums'
      }
    }
  })


  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tablogin1/login');
})

.config(function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
