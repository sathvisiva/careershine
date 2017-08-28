'use strict';




angular.module('todoListApp')
.controller('AddCollegeCtrl', function($scope, $timeout, Colleges,  $location) {
	$scope.save = function(form) {
		if (form.$valid) {
			Colleges.save($scope.college, function(resp) {
				console.log('created', resp);
				$location.path('/listColleges');

			}, function(err) {
				console.log(err);
				$scope.message == err;
			});
		}
	}		
});
angular.module('todoListApp')
.controller('CollegeListCtrl', function($scope, $timeout, Colleges,  $location) {

	$scope.colleges =  Colleges.query();
	console.log($scope.courses)

	$scope.deleteCollege = function(collegeid) {
    
      Colleges.delete({ id:collegeid }, function(resp) {
        console.log(resp)
        $scope.colleges.splice($scope.colleges.indexOf(collegeid), 1);
      })
    };

});

angular.module('todoListApp')
.controller('CollegeEditCtrl', function($scope, $timeout, Colleges,  $location,$routeParams) {

	$scope.save = function(form) {
		if (form.$valid) {
			Colleges.update($scope.course, function(resp) {
				$location.path('/listColleges');

				console.log(resp)
			}, function(err) {
				console.log(err)
			})
		}
	}


	$scope.college = Colleges.get({ id: $routeParams.id }, function(resp) {

		console.log(resp);
	});

});

angular.module('todoListApp')
.controller('CollegeViewCtrl', function($scope, $timeout, Colleges,  $location,$routeParams) {


	$scope.college = Colleges.get({ id: $routeParams.id }, function(resp) {

		console.log(resp);
	});

});
