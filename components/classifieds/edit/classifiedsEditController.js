(function() {
	"use strict";

	angular.module("ngClassifieds").controller("editClassifiedsCtrl", function($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory) {
		var self = this;
		self.closeSidebar = closeSidebar;
		self.saveEdit = saveEdit;
		self.classified = $state.params.classified;

		$timeout(function() {
			$mdSidenav("left").open();
		});

		$scope.$watch(function() { return self.sidenavOpen; }, function(sidenav) {
			if (sidenav === false) {
				$mdSidenav("left")
				.close()
				.then(function() {
					$state.go("classifieds");
				});
			} 
		});

		function closeSidebar() {
			self.sidenavOpen = true;
		}

		function saveEdit(classified) {
			$scope.$emit("editSaved", "Edit Saved!", classified);
			self.sidenavOpen = false;
		}
	});
}());