'use strict';

angular.module('todoListApp', ['ngResource', 'ngRoute','textAngular','ngMaterial'])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'app/main/main.html',
				controller: 'MainCtrl',
				reloadOnSearch: false
			})
			.when('/addPrograms', {
				templateUrl: 'app/programs/Add-programs.html',
				controller: 'AddProgramCtrl',
			})
			.when('/listProgram', {
				templateUrl: 'app/programs/programs.html',
				controller: 'ProgramListCtrl',
			})
			.when('/editProgram/:id', {
				templateUrl: 'app/programs/editprogram.html',
				controller: 'ProgramEditCtrl',
			})
			.when('/viewProgram/:id', {
				templateUrl: 'app/programs/viewProgram.html',
				controller: 'ProgramViewCtrl',
			})
			.when('/addColleges', {
				templateUrl: 'app/colleges/Add-colleges.html',
				controller: 'AddCollegeCtrl',
			})
			.when('/listColleges', {
				templateUrl: 'app/colleges/college.html',
				controller: 'CollegeListCtrl',
			})
			.when('/editCollege/:id', {
				templateUrl: 'app/colleges/editcollege.html',
				controller: 'CollegeEditCtrl',
			})
			.when('/viewCollege/:id', {
				templateUrl: 'app/colleges/viewCollege.html',
				controller: 'CollegeViewCtrl',
			})
			.when('/addCourse', {
				templateUrl: 'app/course/Add-course.html',
				controller: 'CourseCtrl',
			})
			.when('/listCourse', {
				templateUrl: 'app/course/course.html',
				controller: 'CourseListCtrl',
			})
			.when('/editCourse/:id', {
				templateUrl: 'app/course/editcourse.html',
				controller: 'CourseEditCtrl',
			})
			.when('/viewCourse/:id', {
				templateUrl: 'app/course/viewCourse.html',
				controller: 'CourseViewCtrl',
			})
			//CourseViewCtrl
			.otherwise({
				redirectTo: '/'
			});

		$locationProvider.html5Mode(true);
	});