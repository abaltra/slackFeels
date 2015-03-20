angular.module('services.auth', ['ngCookies'])
.factory('Auth', ['$http', '$cookieStore', function($http, $cookieStore){

  var accessLevels = routingConfig.accessLevels
  , userRoles = routingConfig.userRoles
  , currentUser = $cookieStore.get('user') || { username: '', role: userRoles.public };

  $cookieStore.remove('user');

  // TODO refactor
  currentUser.role = currentUser.role === 'user' || currentUser.role === 'admin' ? userRoles[currentUser.role] : userRoles.public;

  function changeUser(user) {
    angular.extend(currentUser, user);
  }

  return {
    authorize: function(accessLevel, role) {
      if(role === undefined) {
        role = currentUser.role;
      }
      return accessLevel.bitMask & role.bitMask;
    },
    isLoggedIn: function(user) {
      if(user === undefined) {
        user = currentUser;
      }
      return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
    },
    // TODO any benefits of using? better structure?
    // register: function(user, success, error) {
    //   $http.post('/register', user).success(function(res) {
    //     changeUser(res);
    //     success();
    //   }).error(error);
    // },
    // login: function(user, success, error) {
    //   $http.post('/login', user).success(function(user){
    //     changeUser(user);
    //     success(user);
    //   }).error(error);
    // },
    // logout: function(success, error) {
    //   $http.post('/logout').success(function(){
    //     changeUser({
    //       username: '',
    //       role: userRoles.public
    //     });
    //     success();
    //   }).error(error);
    // },
    isUser: function(){
      return currentUser && currentUser.role.title === userRoles.user.title;
    },
    isAdmin: function(){
      return currentUser && currentUser.role.title === userRoles.admin.title;
    },
    accessLevels: accessLevels,
    userRoles: userRoles,
    currentUser: currentUser
  };
}]);
