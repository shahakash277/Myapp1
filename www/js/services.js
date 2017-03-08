angular.module('starter.services', ['firebase'])
.factory('fireBaseData', function($firebase,$rootScope) {
  var ref=new Firebase("https://ionicdocumentcloud.firebaseio.com/"),
    refUser= new Firebase("https://ionicdocumentcloud.firebaseio.com/users"),
    reffile=new Firebase("https://ionicdocumentcloud.firebaseio.com/"+$rootScope.uid+"/category/");
  return {
    ref:function(){
        return ref;
    },
    refUser:function(){
        return refUser;
    },
    reffile:function(){
        return reffile;
    }
  }
})

.factory('firebaseFile', ['$firebase','fireBaseData','$firebaseArray',function($rootScope,fireBaseData,$firebaseArray){
var files={};
files.getfiles=function(catid)
  {
  var reffile1=new Firebase("https://ionicdocumentcloud.firebaseio.com/"+$rootScope.uid+"/category/"+catid);

    files.items= $firebaseArray(reffile1);
  };
return files;
}])
.factory('sharedUtils',['$ionicLoading','$ionicPopup', function($ionicLoading,$ionicPopup){



    var functionObj={};

    functionObj.showLoading=function(){
      $ionicLoading.show({
        content: '<i class=" ion-loading-c"></i> ', // The text to display in the loading indicator
        animation: 'fade-in', // The animation to use
        showBackdrop: true, // Will a dark overlay or backdrop cover the entire view
        maxWidth: 200, // The maximum width of the loading indicator. Text will be wrapped if longer than maxWidth
        showDelay: 0 // The delay in showing the indicator
      });
    };
    functionObj.hideLoading=function(){
      $ionicLoading.hide();
    };


    functionObj.showAlert = function(title,message) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: message
      });
    };

    return functionObj;

}])


.service('UserService', function() {
// For the purpose of this example I will store user data on ionic local storage but you should save it on a database
  var setUser = function(user_data) {
    window.localStorage.starter_google_user = JSON.stringify(user_data);
  };
  var getUser = function(){
    return JSON.parse(window.localStorage.starter_google_user || '{}');
  };
  return {
    getUser: getUser,
    setUser: setUser
  };
});
