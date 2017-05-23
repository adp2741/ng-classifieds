(function() {
	
	"use strict";

	angular.module("ngClassifieds").controller("classifiedsCtrl", function($scope, $state, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {
		var self = this;

		self.openSidebar = openSidebar;
		self.closeSidebar = closeSidebar;
		self.saveClassified = saveClassified;
		self.editClassified = editClassified;
		self.saveEdit = saveEdit;
		self.deleteClassified = deleteClassified;

		self.classifieds;
		self.categories;
		self.editing
		self.classified;

		classifiedsFactory.getClassifieds().then(function(classifieds) {
			self.classifieds = classifieds.data;
			self.categories = getCategories(self.classifieds);
		});

		$scope.$on("newClassified", function(event, classified) {
			classified.id = self.classifieds.length + 1;
			self.classifieds.push(classified);
			showToast("Classified Saved!");
		});

		$scope.$on("editSaved", function(event, message, classified) {
			showToast(message);
			alert(classified.price);
		});

		var contact = {
			name: "Andrew Perry",
			phone: "(333) 333-3333",
			email: "dad@dad.com"
		};

		function openSidebar() {
			$state.go("classifieds.new");
		}

		function closeSidebar() {
			$mdSidenav("left").close();
		}

		function saveClassified(classified) {
			if (classified) {
				classified.contact = contact;
				self.classifieds.push(classified);
				self.classified = {};
				self.closeSidebar();
				showToast("Classified Saved!");
			}
		}

		function editClassified(classified) {
			$state.go("classifieds.edit", {
				id: classified.id,
			});
		}

		function saveEdit() {
			self.editing = false;
			self.classified = {};
			closeSidebar();
			showToast("Classified Edited!");
		}

		function deleteClassified(event, classified) {
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
		}

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