'use strict';

angular.module('careershineApp').controller('AddProgramCtrl', function ($scope, $timeout, Programs, $location) {

	$scope.save = function (form) {
		if (form.$valid) {
			Programs.save($scope.program, function (resp) {

				$location.path('/listProgram');
			}, function (err) {

				$scope.message == err;
			});
		}
	};
});

angular.module('careershineApp').controller('ProgramListCtrl', function ($scope, $timeout, Programs, $location) {

	$scope.programs = Programs.query();

	$scope.deleteProgram = function (programsid) {

		Programs['delete']({ id: programsid }, function (resp) {

			$scope.programs.splice($scope.programs.indexOf(programsid), 1);
		});
	};
});

angular.module('careershineApp').controller('ProgramEditCtrl', function ($scope, $timeout, Programs, $location, $routeParams) {

	$scope.save = function (form) {
		if (form.$valid) {
			Programs.update($scope.programs, function (resp) {
				$location.path('/listProgram');
			}, function (err) {});
		}
	};

	$scope.programs = Programs.get({ slug: $routeParams.id }, function (resp) {});
});

angular.module('careershineApp').controller('ProgramViewCtrl', function ($scope, $timeout, Programs, Courses, $location, $routeParams) {

	$scope.program = Programs.get({ slug: $routeParams.id }, function (resp) {
		var q = { where: { program: resp._id } };
		$scope.courses = Courses.query(q, function (res) {
			console.log(res);
		});
	});
});
//# sourceMappingURL=programs.controller.js.map
