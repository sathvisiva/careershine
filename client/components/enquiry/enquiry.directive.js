'use strict';

angular.module('todoListApp')
  .directive('enquiry', () => ({
    templateUrl: 'components/enquiry/enquiry.html',
    restrict: 'E',
    controller: 'EnquiryController',
    controllerAs: 'enquiry'
  }));
