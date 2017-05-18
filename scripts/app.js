"use strict";

angular
	.module("ngClassifieds", ["ngMaterial", "ui.router"])
	.config(function($mdThemingProvider, $stateProvider) {
		$mdThemingProvider.theme("default")
			.primaryPalette("teal")
			.accentPalette("orange");

		$stateProvider
			.state("classifieds", {
				url: "/classifieds",
				templateUrl: "components/classifieds/classifiedsTemplate.html",
				controller: "classifiedsCtrl as classCtrl"
			})
			.state("classifieds.new", {
				url: "/new",
				templateUrl: "components/classifieds/new/classifiedsNewTemplate.html",
				controller: "newClassifiedsCtrl as classCtrl"
			})
			.state("classifieds.edit", {
				url: "/edit",
				templateUrl: "components/classifieds/edit/classifiedsEditTemplate.html",
				controller: "editClassifiedsCtrl as classCtrl"
			});
	});