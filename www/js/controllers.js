angular.module('starter.controllers', ['firebase'])

.controller('ctrllogin',function($scope,$rootScope,$state, $cordovaToast,sharedUtils){
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
    //var clientId="128570300655-3g34aacplssshc7j35me663s403ipofm.apps.googleusercontent.com";
    $scope.loginGmail=function() {
  //  com.googleusercontent.apps.mfopi304s366em53j7chssslpcaa43g3-556003075821
    sharedUtils.showLoading();
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
          sharedUtils.showLoading();
          $state.go('app.albums');
        },
        function (msg) {
        sharedUtils.hideLoading();
            console.log(msg);
        }
      );
  };
$scope.things=function(){
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

.controller('ctrlalbums',function($scope,$rootScope,$state,fireBaseData,$firebaseArray,sharedUtils,$ionicPopover,$ionicActionSheet)
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

$scope.optionmenu=function(catid,catname){

  $ionicActionSheet.show({
      titleText: catname,
      buttons: [
        { text: '<i class="icon ion-edit "></i> Rename' },
        { text: '<i class="icon ion-trash-b"></i>	 Delete' },
        { text: '<i class="icon ion-information"></i>	 Information' }
      ],
      buttonClicked: function(index) {
        console.log('BUTTON CLICKED', index);

        return true;
      }
    })
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


.controller('Fileview', function($scope, $stateParams,$firebaseArray,$firebase,$rootScope,firebaseFile) {
  $scope.catid=$stateParams.catid;
  $scope.title=$stateParams.catname;
  $scope.items = firebaseFile.getfiles($scope.catid);
});
