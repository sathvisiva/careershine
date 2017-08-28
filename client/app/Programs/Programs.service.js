'use strict';

angular.module('todoListApp')
  .factory('Programs', function ($resource) {
    return $resource('api/programs/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  });
  angular.module('todoListApp')
  .factory('Colleges', function ($resource) {
    return $resource('api/colleges/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  });
   angular.module('todoListApp')
  .factory('Courses', function ($resource) {
    return $resource('api/courses/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  });
