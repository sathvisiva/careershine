'use strict';

angular.module('careershineApp').controller('AddCollegeCtrl', function ($scope, $timeout, Colleges, $location) {
	$scope.save = function (form) {
		if (form.$valid) {
			Colleges.save($scope.college, function (resp) {

				$location.path('/listColleges');
			}, function (err) {

				$scope.message == err;
			});
		}
	};
});
angular.module('careershineApp').controller('CollegeListCtrl', function ($scope, $timeout, Colleges, $location) {

	$scope.colleges = Colleges.query();

	$scope.deleteCollege = function (collegeid) {

		Colleges['delete']({ id: collegeid }, function (resp) {

			$scope.colleges.splice($scope.colleges.indexOf(collegeid), 1);
		});
	};
});

angular.module('careershineApp').controller('CollegeEditCtrl', function ($scope, $timeout, Colleges, $location, $routeParams) {

	$scope.save = function (form) {
		if (form.$valid) {
			Colleges.update($scope.college, function (resp) {
				$location.path('/listColleges');
			}, function (err) {});
		}
	};

	$scope.college = Colleges.get({ id: $routeParams.id }, function (resp) {});
});

angular.module('careershineApp').controller('CollegeViewCtrl', function ($scope, $timeout, Colleges, Courses, $location, $routeParams) {

	$scope.college = Colleges.get({ id: $routeParams.id }, function (resp) {
		var q = { where: { college: resp._id } };
		$scope.courses = Courses.query(q, function (res) {
			console.log(res);
		});
	});
});
//# sourceMappingURL=colleges.controller.js.map
