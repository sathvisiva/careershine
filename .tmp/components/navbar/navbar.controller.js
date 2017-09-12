'use strict';

angular.module('careershineApp').controller('NavbarController', function ($scope, $timeout, Courses, Colleges, Programs, $location, NavbarService) {

	$scope.programs = Programs.query();

	$scope.slides = [];
	$scope.active = 0;
	$scope.myInterval = 3000;
	$scope.noWrapSlides = false;

	for (var i = 1; i < 5; i++) {
		$scope.slides.push({
			image: 'assets/img/banner' + i + '.jpg'
		});
	}

	$scope.tree = NavbarService.createnav();
});
//# sourceMappingURL=navbar.controller.js.map
