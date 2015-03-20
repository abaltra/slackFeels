// TODO add login & register here (auth module)
angular.module( 'sailng.auth', [
])
  .controller( 'ForgotCtrl',['$scope', '$http', '$location', 'config', 'titleService', 'SweetAlert', 'Notification', function ForgotController( $scope, $http, $location, config, titleService, SweetAlert, Notification ) {
    //titleService.setTitle('Login');
    $scope.credentials = {};

    $scope.forgot = function() {
      if($scope.form && $scope.form.$invalid){
        Notification.error('Please fix form errors and try again.');
        return;
      }
      var credentials = $scope.credentials;
      if( $.trim(credentials.helper).length > 0 ){
        Notification.error('It appears that you are not human!');
        return;
      }

      $http.post('/auth/local/forgot', credentials)
        .then(function(response){
          if(response.status===200){
            SweetAlert.swal({
                title: 'Password Recovery',
                text: 'Check your inbox!',
                type: 'success'
              },
              function(){
                window.location = '/';
              });
          } else {
            Notification.error('Something went wrong!');
          }
        }, function(response){
          Notification.error('Something went wrong!');
        });
    };

  }])

  .controller( 'RecoverCtrl',['$scope', '$http', '$location', 'config', 'titleService', 'SweetAlert', 'Notification', function RecoverController( $scope, $http, $location, config, titleService, SweetAlert, Notification ) {
    //titleService.setTitle('Login');
    $scope.credentials = {};

    $scope.recover = function() {
      if($scope.form && $scope.form.$invalid){
        Notification.error('Please fix form errors and try again.');
        return;
      }
      var credentials = $scope.credentials;
      if( $.trim(credentials.helper).length > 0 ){
        Notification.error('It appears that you are not human!');
        return;
      }

      credentials.token = $location.search() && $location.search().token ? $location.search().token : null;

      $http.post('/auth/local/recover', credentials)
        .then(function(response){
          if(response.status===200){
            SweetAlert.swal({
                title: 'Password Recovery',
                text: 'Let\'s login!',
                type: 'success'
              },
              function(){
                window.location = '/login';
              });
          } else {
            Notification.error('Something went wrong!');
          }
        }, function(response){
          Notification.error('Something went wrong!');
        });
    };

  }]);
