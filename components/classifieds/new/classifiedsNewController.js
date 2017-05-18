(function() {
	"use strict";

	angular.module("ngClassifieds").controller("newClassifiedsCtrl", function($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory) {
		var self = this;
		self.closeSidebar = closeSidebar;
		self.saveClassified = saveClassified;

		$timeout(function() {
			$mdSidenav("left").open();
		});

		$scope.$watch(function() { return self.sidenavOpen; }, function(sidenav) {
			if (sidenav === false) {
				$mdSidenav("left").close().then(function() {
					$state.go("classifieds");
				});
			} 
		});

		function closeSidebar() {
			self.sidenavOpen = false;
		}

		function saveClassified(classified) {
			if (classified) {
				classified.contact = {
					name: "Andrew Perry",
					phone: "(333) 333-3333",
					email: "dad@dad.com"
				};

				if (classified) {
					$scope.$emit("newClassified", classified);
					self.sidenavOpen = false;
				}
			}
		}
	});
}());