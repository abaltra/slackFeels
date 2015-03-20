angular.module( 'sailng.login', [
])
  .controller( 'LoginCtrl',['$scope', '$http', '$location', 'config', 'titleService', 'Notification', 'Auth', function LoginController( $scope, $http, $location, config, titleService, Notification, Auth ) {
    //titleService.setTitle('Login');

    $scope.login = function() {
      if($scope.form && $scope.form.$invalid){
        Notification.error('Please fix form errors and try again.');
        return;
      }
      var credentials = $scope.credentials;
      if( $.trim(credentials.helper).length > 0 ){
        Notification.error('It appears that you are not human!');
        return;
      }
      credentials.username = credentials.email;
      credentials.identifier = credentials.email;
      credentials.provider = 'local';

      $http.post('/auth/local', credentials)
        .then(function(response){
          if(response.status===200){
            window.location = '/';
          } else {
            Notification.error('Something went wrong!');
          }
        }, function(response){
          Notification.error('Something went wrong!');
        });
    };

  }]);
