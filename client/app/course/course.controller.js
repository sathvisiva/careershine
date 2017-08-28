'use strict';




angular.module('todoListApp')
.controller('CourseCtrl', function($scope, $timeout, Courses,  $location) {


	$scope.save = function(form) {
		if (form.$valid) {
			Courses.save($scope.course, function(resp) {
				console.log('created', resp);
				$location.path('/listCourse');

			}, function(err) {
				console.log(err);
				$scope.message == err;
			});
		}
	}

});
angular.module('todoListApp')
.controller('CourseListCtrl', function($scope, $timeout, Courses,  $location) {

	$scope.courses =  Courses.query();
	console.log($scope.courses)

	$scope.deleteCourse = function(courseid) {
    
      Courses.delete({ id:courseid }, function(resp) {
        console.log(resp)
        $scope.courses.splice($scope.courses.indexOf(courseid), 1);
      })
    };

});

angular.module('todoListApp')
.controller('CourseEditCtrl', function($scope, $timeout, Courses,  $location,$routeParams) {

	$scope.save = function(form) {
		if (form.$valid) {
			Courses.update($scope.course, function(resp) {
				$location.path('/listCourse');

				console.log(resp)
			}, function(err) {
				console.log(err)
			})
		}
	}


	$scope.course = Courses.get({ id: $routeParams.id }, function(resp) {

		console.log(resp);
	});

});

angular.module('todoListApp')
.controller('CourseViewCtrl', function($scope, $timeout, Courses,  $location,$routeParams) {


	$scope.course = Courses.get({ id: $routeParams.id }, function(resp) {

		console.log(resp);
	});

});
