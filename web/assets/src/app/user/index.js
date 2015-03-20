angular.module( 'sailng.user', [
])
  .controller( 'UserProfileCtrl', ['$scope', '$http', 'Auth', 'titleService', 'Notification', 'SweetAlert', 'FileUploader', 'User', function UserProfileController( $scope, $http, Auth, titleService, Notification, SweetAlert, FileUploader, User ) {
    $scope.currentUser = Auth.currentUser;
    $scope.credentials = {};

    User.get(function(result) {
      $scope.user = result;
    });

    // Upload
    var uploader = $scope.uploader = new FileUploader({
      url: '/api/upload/file'
    });
    // Filters
    uploader.filters.push({
      name: 'imageFilter',
      fn: function(item /*{File|FileLikeObject}*/, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });
    // Callback
    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
      //console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
      //console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
      //console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
      //console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
      //console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
      //console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
      //console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
      //console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
      //console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
      //console.info('onCompleteItem', fileItem, response, status, headers);
      if(_.isArray(response)) {
        $scope.user.image = response[0];
      }
    };
    uploader.onCompleteAll = function() {
      //console.info('onCompleteAll');
    };

    $scope.saveProfile = function(){
      if($scope.form && $scope.form.$invalid){
        Notification.error('Please fix form errors and try again.');
        return;
      }

      if($scope.credentials && $scope.credentials.oldPassword && $scope.credentials.newPassword){
        $scope.user.credentials = $scope.credentials;
        $scope.credentials = {};
      }

      $scope.user.$update(function(success){
        //
        SweetAlert.swal({
            title: 'User',
            text: 'User updated!',
            type: 'success'
          },
          function(){
            //
          });
      }, function(error){
        Notification.error('Unable to update user!');
      });
    };

    $scope.updateNotification = function(notification){
      notification.selected = !notification.selected;
      if(notification.selected === true){
        $http.post('/api/user/notification/add', {notification: notification}).
          success(function(data, status, headers, config) {
            Notification.success('Notification saved!');
          }).
          error(function(data, status, headers, config) {
            // handle error
            Notification.error('Unable to save notification!');
          });
      } else {
        $http.post('/api/user/notification/delete', {notification: notification}).
          success(function(data, status, headers, config) {
            Notification.info('Notification deleted!');
          }).
          error(function(data, status, headers, config) {
            // handle error
            Notification.error('Unable to delete notification!');
          });
      }
    }

  }]);
