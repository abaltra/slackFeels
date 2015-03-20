angular.module( 'services.config', ['lodash'])
  .service('config', ['lodash', function(lodash) {

    // private vars here if needed

    return {
      siteName: 'thetwobeards',
      // no trailing slash!
      siteUrl: '/',
      apiUrl: '/api'
    };
  }]);
