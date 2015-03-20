angular.module( 'sailng.header', [
])
  .controller( 'HeaderCtrl', ['$scope', '$state', 'Auth', function HeaderController( $scope, $state, Auth ) {
    $scope.currentUser = Auth.isLoggedIn() ? Auth.currentUser : null;

    $scope.isUser = Auth.isUser();
    $scope.isAdmin = Auth.isAdmin();

    // var navItems = [{
    //   title: 'About',
    //   translationKey: 'navigation:about',
    //   url: '/about',
    //   cssClass: 'fa fa-tasks fa-lg'
    // }];
    //
    // $scope.navItems = navItems;
  }]);
