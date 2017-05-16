(function() {
	
	"use strict";

	angular.module("ngClassifieds").controller("classifiedsCtrl", function(classifiedsFactory, $mdSidenav, $mdToast) {
		var self = this;

		classifiedsFactory.getClassifieds().then(function(classifieds) {
			self.classifieds = classifieds.data;
		});

		var contact = {
			name: "Andrew Perry",
			phone: "(333) 333-3333",
			email: "dad@dad.com"
		};

		self.openSidebar = function() {
			$mdSidenav("left").open();
		};

		self.closeSidebar = function() {
			$mdSidenav("left").close();
		};

		self.saveClassified = function(classified) {
			if (classified) {
				classified.contact = contact;
				self.classifieds.push(classified);
				self.classified = {};
				self.closeSidebar();
				$mdToast.show(
					$mdToast.simple()
						.content("Classified Saved!")
						.position("top, right")
						.hideDelay(3000)
				);
			}
		};

		self.editClassified = function() {
			self.editing = true;
		}
	});
}());