angular.module( 'sailng.register', [
])
  .controller( 'RegisterCtrl', ['$scope', '$http', '$location', 'config', 'titleService', 'Notification', function RegisterController( $scope, $http, $location, config, titleService, Notification ) {
    //titleService.setTitle('Register');

    $scope.register = function() {
      if($scope.form && $scope.form.$invalid){
        Notification.error('Please fix form errors and try again.');
        return;
      }
      var credentials = _($scope.credentials).omit(['passwordConfirmation']);
      if( $.trim(credentials.helper).length > 0 ){
        Notification.error('It appears that you are not human!');
        return;
      }
      credentials.username = credentials.email;
      $http.post('/auth/local/register', credentials)
        .then(function(response){
          if(response.status===200){
            Notification.success('Registered!');
            window.location = '/';
          } else {
            Notification.error('Something went wrong!');
          }
        }, function(response){
          Notification.error('Something went wrong!');
        });
    };

  }]);
