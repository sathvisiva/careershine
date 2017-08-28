'use strict';

angular.module('todoListApp')
.controller('AddProgramCtrl', function($scope, $timeout, Programs,  $location) {


	$scope.save = function(form) {
		if (form.$valid) {
			Programs.save($scope.program, function(resp) {
				console.log('created', resp);
				$location.path('/listProgram');
			}, function(err) {
				console.log(err);
				$scope.message == err;
			});
		}
	}

});

angular.module('todoListApp')
.controller('ProgramListCtrl', function($scope, $timeout, Programs,  $location) {

	$scope.programs =  Programs.query();
	console.log($scope.programs)

	$scope.deleteProgram = function(programsid) {
    
      Programs.delete({ id:programsid }, function(resp) {
        console.log(resp)
        $scope.programs.splice($scope.programs.indexOf(programsid), 1);
      })
    };

});

angular.module('todoListApp')
.controller('ProgramEditCtrl', function($scope, $timeout, Programs,  $location,$routeParams) {

	$scope.save = function(form) {
		if (form.$valid) {
			Programs.update($scope.programs, function(resp) {
				$location.path('/listProgram');

				console.log(resp)
			}, function(err) {
				console.log(err)
			})
		}
	}


	$scope.programs = Programs.get({ id: $routeParams.id }, function(resp) {

		console.log(resp);
	});

});

angular.module('todoListApp')
.controller('ProgramViewCtrl', function($scope, $timeout, Programs,  $location,$routeParams) {


	$scope.programs = Programs.get({ id: $routeParams.id }, function(resp) {

		console.log(resp);
	});

});

