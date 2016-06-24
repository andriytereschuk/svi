'use strict';

(function() {
	angular.module('app', ['ngComponentRouter', 'pascalprecht.translate'])
		.config(function($translateProvider) {
			$translateProvider.determinePreferredLanguage(function() {
				var lang = 'uk';
				// some custom logic's going on in here
				return lang;
			});
			$translateProvider.useLoader('langAsyncLoader');
		})
		.factory('langAsyncLoader', function($q, $http) {
			return function(options) {
				var deferred = $q.defer(),
					translations,
					file;

				file = 'lang/' + options.key + '.json';

				$http.get(file)
					.then(function(resp) {
						translations = resp.data;
						deferred.resolve(translations);
					});

				return deferred.promise;
			};
		})
		.value('$routerRootComponent', 'main')
		.component('main', {
			template: '<ng-outlet></ng-outlet>',
			$routeConfig: [
				{ path: '/', component: 'hotels', name: 'Hotels', useAsDefault: true },
				{ path: '/:id', component: 'hotel', name: 'Hotel' },
				{ path: '/rooms', component: 'rooms', name: 'Rooms' }
			]
		})
		.component('hotels', {
			templateUrl: 'tmpl/hotels.html',
			controllerAs: 'model',
			controller: function($http) {
				var model = this;

				model.$routerOnActivate = function() {
					$http.get('data/hotels.json')
						.then(function(resp) {
							model.hotels = resp.data;
						});
				};
			}
		})
		.component('hotel', {
			templateUrl: 'tmpl/hotel.html',
			controllerAs: 'model',
			controller: function() {
				var model = this;

				// var element = document.getElementById('swiper1');
				var swiper = new Swiper('.swiper1', {
					loop: true
				});

				model.$routerOnActivate = function(next) {
					model.id = next.params.id;
				};
			}
		})
		.component('rooms', {
			templateUrl: 'tmpl/rooms.html'
		});
})();