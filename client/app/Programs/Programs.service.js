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
angular.module('todoListApp')
.factory('Enquiry', function ($resource) {
  return $resource('api/enquiry/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
});

angular.module('todoListApp')
.factory('Blog', function ($resource) {
  return $resource('api/blog/:id/:controller', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    },
    'comment': {
      method: 'POST',
      params: {
        controller: 'comment',
        limit: null
      }
    },
    'comments': {
      method: 'GET',
      isArray: true,
      params: {
        controller: 'comments',
        limit: null
      }
    },
  });
});
