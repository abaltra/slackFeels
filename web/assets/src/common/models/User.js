angular.module('models.user', ['lodash', 'services'])
  .service('User', ['$resource', function($resource) {

    //return $resource('/api/user/:id');
    return $resource('/api/user/:id', { id: '@id' }, {
      update: {
        method: 'PUT' // this method issues a PUT request
      }
    });

  }]);
