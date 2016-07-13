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


	.factory('countriesList', ['$http', '$q', 'cc_endpoint', 'cc_countries_json', function($http, $q, cc_endpoint, cc_countries_json){
		return function(params){

		var reqParams = {
			country : 'default',
			lang : 'default',
			type: 'JSON'
		};
		return $http.get(cc_countries_json, {params: reqParams})
			.then(function(response){
				return $q.when(response.data);
			})
		};
	}])
	.controller('HomeCtrl', function(){

	})
	.controller('CountryListCtrl', ['$scope', 'countriesList', function($scope, countriesList){ 	
		countriesList()
			.then(function(response) {
		    	$scope.data = response.data;
		})
	}])
	.controller('CountryDetailCtrl',['$scope', 'countriesList',function($scope, countriesList){ 
		countriesList()
			.then(function(response) {
		    	$scope.data = response.data;
		})
	}])
