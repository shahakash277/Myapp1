angular.module('starter.controllers', ['firebase'])

.controller('ctrllogin',function($scope,$rootScope, $http, $ionicLoading, $location,$ionicHistory,$state,$ionicSideMenuDelegate, $cordovaToast,sharedUtils,$cordovaOauth){
  $rootScope.extras=false;

  $scope.loginEmail= function($formName,cred){

    if($formName.$valid) {
    sharedUtils.showLoading();
        firebase.auth().signInWithEmailAndPassword(cred.email,cred.password).then(function(result) {
             sharedUtils.hideLoading();
             $rootScope.uid=result.uid;
            $state.go('app.albums', {}, {location: "replace"});

          },
          function(error) {
             sharedUtils.hideLoading();
              $cordovaToast.show('Invalid Email Id Or password', 'long', 'bottom');
          }
      );

    }else{

        $cordovaToast.show("Data not Valid", 'long', 'bottom');
    }
  };

$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  $scope.loginGmail=function() {
    //var clientId="128570300655-3g34aacplssshc7j35me663s403ipofm.apps.googleusercontent.com";
  //  com.googleusercontent.apps.mfopi304s366em53j7chssslpcaa43g3-556003075821
      $ionicLoading.show({
        template: 'Logging in...'
      });
      window.plugins.googleplus.login(
        {},
        function (user_data) {
          // For the purpose of this example I will store user data on local storage
          UserService.setUser({
            userID: user_data.userId,
            name: user_data.displayName,
            email: user_data.email,
            picture: user_data.imageUrl,
            accessToken: user_data.accessToken,
            idToken: user_data.idToken
          });
          $ionicLoading.hide();
          $state.go('app.albums');
        },
        function (msg) {
          $ionicLoading.hide();
            console.log(msg);
        }
      );
  };
$scope.things=function(){
alert('suceess');
fileChooser.open(function(uri) {
    alert(uri);
});
};
})
.controller('ctrlsignUp', function($scope,sharedUtils,$rootScope,$ionicLoading,$ionicHistory,$state,$ionicSideMenuDelegate, $cordovaToast,fireBaseData,$firebase) {

$scope.signUpEmail=function(formName,cred){
  sharedUtils.showLoading();
  firebase.auth().createUserWithEmailAndPassword(cred.email,cred.password).then(function(result){
fireBaseData.refUser().child(result.uid).set({
  fname:cred.fname,
  lname:cred.lname
});
$rootScope.uid=result.uid;
fireBaseData.ref().child($rootScope.uid).set({
  category:{
    cat_1:{
      name:"movie"
    },
    cat_2:{
        name:"images"
    },
    cat_3:{
          name:"document"
    }
  }
});

    $ionicSideMenuDelegate.canDragContent(true);  // Sets up the sideMenu dragable
    sharedUtils.hideLoading();
    $state.go('app.albums',{},"replace");
//    alert(result.uid);
  },function(error){
    sharedUtils.hideLoading();
      alert('already register account');
  });

};
})

.controller('ctrlalbums',function($scope,$rootScope,$state,fireBaseData,$firebaseArray,sharedUtils,$ionicPopover)
{
  if($rootScope.uid==null)
  {
    $state.go('tabsController.login', {}, {location: "replace"});
  }
  sharedUtils.showLoading();
  var sref=fireBaseData.ref().child($rootScope.uid).child("category");
$scope.albumitems=$firebaseArray(sref);
sharedUtils.hideLoading();

$ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.goto=function(catid,catname){
      $state.go('app.files',{catid:catid,catname:catname});

  };
})

.controller('AppCtrl', function($scope,$rootScope,$state) {

    if($rootScope.uid==null)
    {
      $state.go('tabsController.login', {}, {location: "replace"});
    }
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})


.controller('Fileview', function($scope, $stateParams,$firebaseArray,$firebase,$rootScope) {
  $scope.catid=$stateParams.catid;
  $scope.title=$stateParams.catname;
  //console.log($routeParams.param);
  var reffile1=new Firebase("https://ionicdocumentcloud.firebaseio.com/"+$rootScope.uid+"/category/"+$scope.catid+"/files");
    $scope.items= $firebaseArray(reffile1);
});
