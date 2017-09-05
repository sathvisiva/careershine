'use strict';

angular.module('todoListApp', ['ngResource', 'ngRoute','textAngular','ngMaterial','ui.bootstrap'])
.config(function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'app/main/main.html',
		controller: 'MainCtrl'
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
	.when('/listenquires', {
		templateUrl: 'app/enquire/enquires.html',
		controller: 'EnquireListCtrl',
	})
	.when('/viewEnquiry/:id', {
		templateUrl: 'app/enquire/viewenquiry.html',
		controller: 'EnquireviewCtrl',
	})

	.when('/addBlog', {
		templateUrl: 'app/blog/Add-blog.html',
		controller: 'AddBlogCtrl',
	})
	.when('/listBlog', {
		templateUrl: 'app/blog/blog.html',
		controller: 'BlogListCtrl',
	})
	.when('/editBlog/:id', {
		templateUrl: 'app/blog/editblog.html',
		controller: 'BlogEditCtrl',
	})
	.when('/viewBlog/:id', {
		templateUrl: 'app/blog/viewBlog.html',
		controller: 'BlogViewCtrl',
	})
	.when('/about', {
		templateUrl: 'app/about.html'
	})
	.when('/contact', {
		templateUrl: 'app/contactus.html'
	})
	.when('/blog', {
		templateUrl: 'app/blog/bloglist.html',
		controller: 'BlogListCtrl',
	})
	.when('/admin', {
		templateUrl: 'app/admin.html'
	})
			//CourseViewCtrl
			.otherwise({
				redirectTo: '/'
			});

			$locationProvider.html5Mode(true);
		})
.directive("randomBackgroundcolor", function () {
	return {
		restrict: 'EA',
		replace: false,
		link: function (scope, element, attr) {

            //generate random color
            var color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16); 
            
            //Add random background class to selected element
            element.css('background-color', color);

        }
    }
});