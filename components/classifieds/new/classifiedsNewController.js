(function() {
	"use strict";

	angular.module("ngClassifieds").controller("newClassifiedsCtrl", function($scope, $mdSidenav, $timeout, $mdDialog, classifiedsFactory) {
		var self = this;

		$timeout(function() {
			$mdSidenav("left").open();
		});

		$scope.$watch("self.valueToChange", function(value) {
			if (value ===2) {
				console.log("value changed to " + value);
			}
		});

		self.valueToChange = 1;

		$timeout(function() {
			self.valueToChange = 2;
		}, 2000);
	});
}());