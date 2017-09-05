'use strict';
/*
class NavbarController {
  //end-non-standard

  //start-non-standard
  constructor($location) {
  	this.$location = $location;
  }

  isActive(route) {
  	return route === this.$location.path();
  }
}

angular.module('todoListApp')
.controller('NavbarController', NavbarController);*/

angular.module('todoListApp')
.controller('NavbarController', function($scope, $timeout, Courses, Colleges, Programs, $location) {


	$scope.programs =  Programs.query();
	/*$scope.colleges =  Colleges.query();*/	
	


	/*console.log($scope.colleges);
	console.log($scope.courses);
	*/
	$scope.slides = [];
	$scope.active = 0;
	$scope.myInterval = 3000;
	$scope.noWrapSlides = false;

	for(var i=1;i<5;i++){  
		$scope.slides.push({
			image: 'assets/banners/banner'+i+'.jpg'
		});
	}


	$scope.buildnavbar = function(){

		$scope.tree = [];

		$scope.courses = Courses.query(function(courses){
			$scope.colleges =  Colleges.query(function(res){
				angular.forEach(res, function(value, key){
					var q = {where:{college:value._id}};
					$scope.subcourses = _.filter($scope.courses, function(course) {
						return course.college == value._id;
					});
					if($scope.subcourses.length > 0){
						value.subcourse = [];
						for(i =0 ; i< $scope.subcourses.length ; i++){
							value.subcourse.push($scope.subcourses[i])
						}
						
					}

					$scope.tree.push(value);

			/*	Courses.query(function(res){
					if(res.length > 0){
						value.subcourse = [];
						value.subcourse.push(res)
					}

				});*/
				

			});
				


			});	

		});
		

	}

	$scope.buildnavbar();



/*	$scope.save = function(form) {
		if (form.$valid) {
			Courses.save($scope.course, function(resp) {
				console.log('created', resp);
				$location.path('/listCourse');

			}, function(err) {
				console.log(err);
				$scope.message == err;
			});
		}
	}*/

});
