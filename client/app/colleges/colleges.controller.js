'use strict';




angular.module('todoListApp')
.controller('AddCollegeCtrl', function($scope, $timeout, Colleges,  $location) {
	$scope.save = function(form) {
		if (form.$valid) {
			Colleges.save($scope.college, function(resp) {
				
				$location.path('/listColleges');

			}, function(err) {
				
				$scope.message == err;
			});
		}
	}		
});
angular.module('todoListApp')
.controller('CollegeListCtrl', function($scope, $timeout, Colleges,  $location) {

	$scope.colleges =  Colleges.query();
	

	$scope.deleteCollege = function(collegeid) {
    
      Colleges.delete({ id:collegeid }, function(resp) {
        
        $scope.colleges.splice($scope.colleges.indexOf(collegeid), 1);
      })
    };

});

angular.module('todoListApp')
.controller('CollegeEditCtrl', function($scope, $timeout, Colleges,  $location,$routeParams) {

	$scope.save = function(form) {
		if (form.$valid) {
			Colleges.update($scope.college, function(resp) {
				$location.path('/listColleges');

				
			}, function(err) {
				
			})
		}
	}


	$scope.college = Colleges.get({ id: $routeParams.id }, function(resp) {

		
	});

});

angular.module('todoListApp')
.controller('CollegeViewCtrl', function($scope, $timeout, Colleges,  $location,$routeParams) {


	$scope.college = Colleges.get({ id: $routeParams.id }, function(resp) {

		
	});

});
