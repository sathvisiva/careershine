'use strict';
angular.module('careershineApp')
.controller('MainCtrl', function($scope, $timeout, Courses, filterFilter, $location,Colleges, NavbarService) {
	var q = {where:{enablement:true}};
	$scope.enablementcourses = [];

	$scope.colleges = Colleges.query(function(colleges){
		$scope.courses =  Courses.query(q, function(res){

			angular.forEach(res, function(value, key){
				$scope.college =_.filter(colleges, function(college) {
					return college._id == value.college;
				});
				value.logo = $scope.college[0].logo;

				$scope.enablementcourses.push(value);
			});

		});

	});


	

});