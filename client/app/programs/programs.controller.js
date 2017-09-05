'use strict';

angular.module('todoListApp')
.controller('AddProgramCtrl', function($scope, $timeout, Programs,  $location) {


	$scope.save = function(form) {
		if (form.$valid) {
			Programs.save($scope.program, function(resp) {
				
				$location.path('/listProgram');
			}, function(err) {
				
				$scope.message == err;
			});
		}
	}

});

angular.module('todoListApp')
.controller('ProgramListCtrl', function($scope, $timeout, Programs,  $location) {

	$scope.programs =  Programs.query();
	

	$scope.deleteProgram = function(programsid) {
    
      Programs.delete({ id:programsid }, function(resp) {
        
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

				
			}, function(err) {
				
			})
		}
	}


	$scope.programs = Programs.get({ slug: $routeParams.id }, function(resp) {

		
	});

});

angular.module('todoListApp')
.controller('ProgramViewCtrl', function($scope, $timeout, Programs,  $location,$routeParams) {


	$scope.program = Programs.get({ slug: $routeParams.id }, function(resp) {

		
	});

});

