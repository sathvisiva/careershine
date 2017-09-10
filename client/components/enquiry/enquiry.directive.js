'use strict';

angular.module('careershineApp')
  .directive('enquiry', () => ({
    templateUrl: 'components/enquiry/enquiry.html',
    restrict: 'E',
    controller: 'EnquiryController',
    controllerAs: 'enquiry'
  }));
