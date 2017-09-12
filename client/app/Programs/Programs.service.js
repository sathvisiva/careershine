'use strict';

angular.module('careershineApp')
.factory('Programs', function ($resource) {
  return $resource('api/programs/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
});
angular.module('careershineApp')
.factory('Colleges', function ($resource) {
  return $resource('api/colleges/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
});
angular.module('careershineApp')
.factory('Courses', function ($resource) {
  return $resource('api/courses/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
});
angular.module('careershineApp')
.factory('Enquiry', function ($resource) {
  return $resource('api/enquiry/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
});

angular.module('careershineApp')
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

angular.module('careershineApp')
.service('NavbarService', function($http,Courses, Colleges) {
  var myData = null;

  /*  var promise = $http.get('data.json').success(function (data) {
      myData = data;
    });*/

    var tree = [];

    var courses = Courses.query(function(courses){
      var colleges =  Colleges.query(function(res){
        angular.forEach(res, function(value, key){
          var q = {where:{college:value._id}};
          var subcourses = _.filter(courses, function(course) {
            return course.college == value._id;
          });
          if(subcourses.length > 0){
            value.subcourse = [];
            for(i =0 ; i< subcourses.length ; i++){
              value.subcourse.push(subcourses[i])
            }
            
          }

          tree.push(value);     

      });
        


      }); 

    });




    return {
      
      createnav: function () {
        return tree;
      },
    };
  });
