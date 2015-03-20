angular.module( 'sailng', [
  'ui.router',
  //'ngSails',
  'angularMoment',
  'lodash',
  'ngResource',
  'ui.bootstrap',
  'templates-app',
  'services',
  'models',
  'ngTable',
  'ui-notification',
  'ngFormValidation',
  'directives',
  'angular.filter',
  'oitozero.ngSweetAlert',
  'angularFileUpload',
  'angular-loading-bar',
  'xeditable',
  'chart.js',
  'sailng.header',
  'sailng.footer',
  'sailng.home',
  'sailng.auth',
  'sailng.register',
  'sailng.login',
  'sailng.user'
])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    '$httpProvider',
    'formValidationDecorationsProvider',
    'formValidationErrorsProvider',
    'cfpLoadingBarProvider',
    function myAppConfig ( $stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, formValidationDecorationsProvider, formValidationErrorsProvider, cfpLoadingBarProvider ) {

      var access = routingConfig.accessLevels;

      $stateProvider
      .state( 'home', {
        url: '/',
        views: {
          "main": {
            controller: 'HomeCtrl',
            templateUrl: 'home/index.tpl.html'
          }
        },
        data: {
          access: access.public
        }
      })
      // auth
      .state( 'register', {
        url: '/register',
        views: {
          "main": {
            controller: 'RegisterCtrl',
            templateUrl: 'register/index.tpl.html'
          }
        },
        data: {
          access: access.anonymous
        }
      })
      .state( 'login', {
        url: '/login',
        views: {
          "main": {
            controller: 'LoginCtrl',
            templateUrl: 'login/index.tpl.html'
          }
        },
        data: {
          access: access.anonymous
        }
      })
      // user
      .state( 'profile', {
        url: '/profile',
        views: {
          "main": {
            controller: 'UserProfileCtrl',
            templateUrl: 'user/profile.tpl.html'
          }
        },
        data: {
          access: access.user
        }
      });

      $urlRouterProvider.otherwise(function ($injector, $location) {

        if ($location.$$url === '/') {
          // window.location = '/home';
        }
        else {
          // pass through to let the web server handle this request

          window.location = $location.$$absUrl;
        }
      });
      $locationProvider.html5Mode(true);

      $httpProvider.interceptors.push(function($q, $location) {
        return {
          'responseError': function(response) {
            if(response.status === 401 || response.status === 403) {
              $location.path('/login');
            }
            return $q.reject(response);
          }
        };
      });

      formValidationDecorationsProvider.useBuiltInDecorator('bootstrap');
      formValidationErrorsProvider.useBuiltInErrorListRenderer('bootstrap');

      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.latencyThreshold = 10;
  }])
  .run(['$rootScope', '$state', '$timeout', 'Auth', 'editableOptions', function ($rootScope, $state, $timeout, Auth, editableOptions) {
    moment.locale('en');

    editableOptions.theme = 'bs3';

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      if(!('data' in toState) || !('access' in toState.data)){
        console.info('Access undefined for this state');
        event.preventDefault();
      }
      else if (!Auth.authorize(toState.data.access)) {
        console.info('Seems like you tried accessing a route you don\'t have access to...');
        event.preventDefault();

        if(fromState.url === '^') {
          if(Auth.isLoggedIn()) {
            $state.go('home');
          } else {
            $state.go('login');
          }
        }
      }
    });

  }])

  .controller( 'AppCtrl',['$scope', 'config', 'Auth', function AppCtrl ( $scope, config, Auth ) {
    // config.currentUser = window.currentUser;
  }]);
