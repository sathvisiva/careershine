'use strict';
angular.module('careershineApp')
.controller('EnquiryController', function($scope, $timeout, Courses, Colleges, Programs, Enquiry,$location, NavbarService) {


	


	$scope.cities = ['Bangalore','Bharuch','Bhopal','Bhubaneswar','Calicut','Chandigarh','Ahmedabad','Chennai',
	'Cochin','Coimbatore','Durgapur','Faridabad','Ghaziabad','GOA','Gurgaon','Hyderabad',
	'Indore','Jaipur','Jalandhar','Jammu','Jamshedpur','Jodhpur','Kanpur',
	'Kolkata','Lucknow','Ludhiana','Mohali','Mumbai','Nagpur','New Delhi','Noida',
	'Panchkula','Patna','Pune','Raipur','Ranchi','Trivandrum','Udaipur','Vadodara','Vapi','Varanasi',
	'Vishakhapatnam'];


	

	$scope.colleges = Colleges.query();
	$scope.courses =  Courses.query()

	var servicecourses = NavbarService.getCourses();



	$scope.update = function(){
		
		$scope.subcourses = _.filter($scope.courses, function(course) {
			return course.college == $scope.enquiry.college;
		});

		
		
	}

	$scope.save = function(form) {
		if (form.$valid) {
			Enquiry.save($scope.enquiry, function(resp) {
				
				

			}, function(err) {
				
				$scope.message == err;
			});
		}
	}


});

angular.module('careershineApp')
.controller('EnquireListCtrl', function($scope, $timeout, Enquiry,  $location) {
	$scope.enquiries =  Enquiry.query();
});

angular.module('careershineApp')
.controller('EnquireviewCtrl', function($scope, $timeout, Enquiry, Courses,Colleges, $location,$routeParams) {

	var q = {where:{_id:$routeParams.id}};

	$scope.enquiry = Enquiry.query(q, function(resp) {
		var q = {where:{_id:resp[0].course}};
		$scope.course = Courses.query(q);
		var q = {where:{_id:resp[0].college}};
		$scope.college = Colleges.query(q);
		
	});

});
