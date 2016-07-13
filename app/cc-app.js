angular
	.module('cc-App', ['ngRoute', 'ngMessages', 'ngAnimate'])
	.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){
		$httpProvider.defaults.useXDomain = true;
		$routeProvider.when('/', {
			templateUrl : 'home.html',
			controller : 'HomeCtrl as vm'
		})
		.when('/countries', {
			templateUrl : 'country-list.html',
			controller : 'CountryListCtrl as vm'
		})
		.when('/countries/:countryCode', {
			templateUrl : 'country-detail.html',
			controller : 'CountryDetailCtrl as vm'
		})
	}])
	.constant('cc_endpoint', 'http://api.geonames.org/countryInfoJSON?')
  	.constant('cc_username', 'onesixdee')

	.factory('countriesJSON', ['$http', '$q', 'cc_endpoint', 'cc_username', function($http, $q, cc_endpoint, cc_username){
		return function(){

		var url = cc_endpoint;

		return $http.get(url + 'username=' + cc_username, {cache: true})
        		.then(function(response){
          			return $q.when(response.data);
        		});
		};
	}])
	.controller('HomeCtrl', function(){

	})
	.controller('CountryListCtrl', ['$scope', 'countriesJSON', function($scope, countriesJSON){ 	
		countriesJSON()
			.then(function(response) {
		    	$scope.geonames = response.geonames;
		})
	}])
	.controller('CountryDetailCtrl', ['$scope', 'countriesJSON', function($scope, countriesJSON){ 
		countriesJSON()
			.then(function(response) {
		})
}])