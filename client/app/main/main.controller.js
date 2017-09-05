'use strict';
(function() {

	class MainComponent {
		constructor() {
			//this.message = 'Hello';
		}
	}
	
	angular.module('todoListApp')
	.controller('MainCtrl', function($scope, $timeout, Courses, filterFilter, $location,Colleges) {
		var q = {where:{enablement:true}};
		$scope.enablementcourses = [];

		$scope.colleges = Colleges.query();
		$scope.courses =  Courses.query(q, function(res){

			angular.forEach(res, function(value, key){
				$scope.college =_.filter($scope.colleges, function(college) {
					return college._id == value.college;
				});
				value.logo = $scope.college[0].logo;

				$scope.enablementcourses.push(value);
			});

		});

		

	});
})();