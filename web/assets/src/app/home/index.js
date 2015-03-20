angular.module( 'sailng.home', [])
  .controller( 'HomeCtrl', ['$scope', 'titleService', 'SweetAlert', 'Notification', 'Auth', function HomeController( $scope, titleService, SweetAlert, Notification, Auth ) {
    //titleService.setTitle('Home');
    $scope.currentUser = Auth.isLoggedIn() ? Auth.currentUser : null;

    $scope.labels = ['Neutral', 'Happy', 'Sad'];
    $scope.colours = ['#E1E1E1', '#0C9644', '#FC5E4D'];
    $scope.options = {
        animationSteps : 100,
        animateRotate: false,
        animateScale: true
    };
    $scope.stats = {
        teams: [
            {
                name: "#general",
                days: [
                    {
                        name: "Monday",
                        data: [50, 10, 40]
                    },
                    {
                        name: "Tuesday",
                        data: [40, 20, 40]
                    },
                    {
                        name: "Wednesday",
                        data: [30, 30, 40]
                    },
                    {
                        name: "Thursday",
                        data: [20, 40, 40]
                    },
                    {
                        name: "Friday",
                        data: [10, 50, 40]
                    }
                ]
            },
            {
                name: "#p-001",
                days: [
                    {
                        name: "Monday",
                        data: [50, 10, 40]
                    },
                    {
                        name: "Tuesday",
                        data: [40, 20, 40]
                    },
                    {
                        name: "Wednesday",
                        data: [30, 30, 40]
                    },
                    {
                        name: "Thursday",
                        data: [20, 40, 40]
                    },
                    {
                        name: "Friday",
                        data: [10, 50, 40]
                    }
                ]
            },
            {
                name: "#p-002",
                days: [
                    {
                        name: "Monday",
                        data: [50, 10, 40]
                    },
                    {
                        name: "Tuesday",
                        data: [40, 20, 40]
                    },
                    {
                        name: "Wednesday",
                        data: [30, 30, 40]
                    },
                    {
                        name: "Thursday",
                        data: [20, 40, 40]
                    },
                    {
                        name: "Friday",
                        data: [10, 50, 40]
                    }
                ]
            },
            {
                name: "#p-003",
                days: [
                    {
                        name: "Monday",
                        data: [50, 10, 40]
                    },
                    {
                        name: "Tuesday",
                        data: [40, 20, 40]
                    },
                    {
                        name: "Wednesday",
                        data: [30, 30, 40]
                    },
                    {
                        name: "Thursday",
                        data: [20, 40, 40]
                    },
                    {
                        name: "Friday",
                        data: [10, 50, 40]
                    }
                ]
            }
        ]
    };

  }]);
