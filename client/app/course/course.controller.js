'use strict';




angular.module('todoListApp')
.controller('CourseCtrl', function($scope, $timeout, Courses, Colleges, Programs, $location) {

	$scope.colleges =  Colleges.query();
	$scope.programs =  Programs.query();


	$scope.save = function(form) {
		if (form.$valid) {
			Courses.save($scope.course, function(resp) {

				$location.path('/listCourse');

			}, function(err) {
				
				$scope.message == err;
			});
		}
	}

});
angular.module('todoListApp')
.controller('CourseListCtrl', function($scope, $timeout, Courses,  $location) {

	$scope.courses =  Courses.query();
	

	$scope.deleteCourse = function(courseid) {
		
		Courses.delete({ id:courseid }, function(resp) {
			
			$scope.courses.splice($scope.courses.indexOf(courseid), 1);
		})
	};

});

angular.module('todoListApp')
.controller('CourseEditCtrl', function($scope, $timeout, Courses, Colleges, Programs,  $location,$routeParams) {

	$scope.save = function(form) {
		if (form.$valid) {
			Courses.update($scope.course, function(resp) {
				$location.path('/listCourse');

				
			}, function(err) {
				
			})
		}
	}

	$scope.colleges =  Colleges.query();
	$scope.programs =  Programs.query();


	$scope.course = Courses.get({ id: $routeParams.id }, function(resp) {

		
	});

});

angular.module('todoListApp')
.controller('CourseViewCtrl', function($scope, $timeout, Courses, Colleges, Programs,  $location,$routeParams) {

	$scope.colleges =  Colleges.query();
	$scope.programs =  Programs.query();

	$scope.course = Courses.get({ id: $routeParams.id }, function(resp) {

		
	});

});
