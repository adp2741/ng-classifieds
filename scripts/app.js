angular
	.module("ngClassifieds", ["ngMaterial"])
	.config(function($mdThemingProvider) {
		$mdThemingProvider.theme("default")
			.primaryPalette("teal")
			.accentPalette("orange");
	})
	.directive("helloWorld", function() {
		return {
			template: "<h1></h1>"
		}
	});

// angular.element(function() {
//       angular.bootstrap(document, ['ngClassifieds']);
// });