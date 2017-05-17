(function() {
	
	"use strict";

	angular.module("ngClassifieds").controller("classifiedsCtrl", function(classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {
		var self = this;

		classifiedsFactory.getClassifieds().then(function(classifieds) {
			self.classifieds = classifieds.data;
			self.categories = getCategories(self.classifieds);
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
				showToast("Classified Saved!");
			}
		};

		self.editClassified = function(classified) {
			self.editing = true;
			self.openSidebar();
			self.classified = classified;
		};

		self.saveEdit = function() {
			self.editing = false;
			self.classified = {};
			self.closeSidebar();
			showToast("Classified Edited!");
		};

		self.deleteClassified = function(event, classified) {
			var confirm = $mdDialog.confirm()
				.title("Are you sure you want to delete " + classified.title + "?")
				.ok("Yes")
				.cancel("No")
				.targetEvent(event);
			$mdDialog.show(confirm).then(function() {
				var index = self.classifieds.indexOf(classified);
				self.classifieds.splice(index, 1);
			}, function() {

			});
		};

		function showToast(message) {
			$mdToast.show(
				$mdToast.simple()
					.content(message)
					.position("top, right")
					.hideDelay(2000)
			);
		}

		function getCategories(classifieds) {
			var categories = [];
			angular.forEach(classifieds, function(item) {
				angular.forEach(item.categories, function(category) {
					categories.push(category);
				});
			});

			return _.uniq(categories);
		}
	});
}());