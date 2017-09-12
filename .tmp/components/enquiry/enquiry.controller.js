'use strict';
angular.module('careershineApp').controller('EnquiryController', function ($scope, $timeout, Courses, Colleges, Programs, Enquiry, $location, NavbarService) {

	$scope.cities = ['Bangalore', 'Bharuch', 'Bhopal', 'Bhubaneswar', 'Calicut', 'Chandigarh', 'Ahmedabad', 'Chennai', 'Cochin', 'Coimbatore', 'Durgapur', 'Faridabad', 'Ghaziabad', 'GOA', 'Gurgaon', 'Hyderabad', 'Indore', 'Jaipur', 'Jalandhar', 'Jammu', 'Jamshedpur', 'Jodhpur', 'Kanpur', 'Kolkata', 'Lucknow', 'Ludhiana', 'Mohali', 'Mumbai', 'Nagpur', 'New Delhi', 'Noida', 'Panchkula', 'Patna', 'Pune', 'Raipur', 'Ranchi', 'Trivandrum', 'Udaipur', 'Vadodara', 'Vapi', 'Varanasi', 'Vishakhapatnam'];

	$scope.colleges = Colleges.query();

	var servicecourses = NavbarService.createnav();

	$scope.update = function () {

		var q = { where: { college: $scope.enquiry.college } };
		Courses.query(q, function (res) {
			$scope.subcourses = res;
		});
	};

	$scope.save = function (form) {
		if (form.$valid) {

			angular.forEach($scope.colleges, function (value, key) {
				if (value._id === $scope.enquiry.college) {
					$scope.enquiry.college = value.name;
				}
			});

			Enquiry.save($scope.enquiry, function (resp) {

				$scope.enquiry = '';
			}, function (err) {

				$scope.message == err;
			});
		}
	};
});

angular.module('careershineApp').controller('EnquireListCtrl', function ($scope, $timeout, Enquiry, $location) {
	$scope.enquiries = Enquiry.query();
});

angular.module('careershineApp').controller('EnquireviewCtrl', function ($scope, $timeout, Enquiry, Courses, Colleges, $location, $routeParams) {

	var q = { where: { _id: $routeParams.id } };

	$scope.enquiry = Enquiry.query(q);
});
//# sourceMappingURL=enquiry.controller.js.map
