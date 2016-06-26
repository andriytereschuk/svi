'use strict';

(function() {
	angular.module('app', ['ngComponentRouter', 'pascalprecht.translate'])
		.config(function($translateProvider) {
			$translateProvider.determinePreferredLanguage(function() {
				var elem = document.querySelector('html');
				var lang = elem.getAttribute('lang');
				return lang;
			});
			$translateProvider.useLoader('langAsyncLoader');
		})

		.config(function($locationProvider) {
			$locationProvider.html5Mode(true);
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

		.service('dataService', function($http) {
			this.getHotels = function() {
				return $http.get('data/hotels.json')
					.then(function(resp) {
						var data = resp.data;
						return data;
					});
			};

			this.getHotel = function(id) {
				var file = 'data/hotel' + id + '.json';
				return $http.get(file)
					.then(function(resp) {
						var data = resp.data;
						return data;
					});
			};

			this.getRoom = function(hotelId, roomId) {
				var file = 'data/hotel' + hotelId + '/room' + roomId + '.json';
				return $http.get(file)
					.then(function(resp) {
						var data = resp.data;
						return data;
					});
			}
		})

		.value('$routerRootComponent', 'main')

		.component('main', {
			template: '<ng-outlet></ng-outlet>',
			$routeConfig: [
				{ path: 'homes/', component: 'hotels', name: 'Hotels', useAsDefault: true },
				{ path: 'homes/:id', component: 'hotel', name: 'Hotel' },
				{ path: 'homes/:hotelId/rooms/:roomId', component: 'room', name: 'Room' }
			]
		})

		.component('hotels', {
			templateUrl: 'tmpl/hotels.html',
			controllerAs: 'model',
			controller: function(dataService) {
				var model = this;

				dataService.getHotels()
					.then(function(data) {
						model.hotels = data;
					});
			}
		})

		.component('hotel', {
			templateUrl: 'tmpl/hotel.html',
			controllerAs: 'model',
			controller: function(dataService) {
				var model = this;
				var swiper;

				model.$routerOnActivate = function(next) {
					var id = next.params.id;
					model.id = id;

					dataService.getHotel(id)
						.then(function(data) {
							model.hotel = data;

							swiper = new Swiper('.swiper', {
								loop: true,
								speed: 400,
								nextButton: '.swiper-next',
								prevButton: '.swiper-prev'
							});
						});
				};

				model.$onDestroy = function() {
					swiper.destroy();
				};
			}
		})

		.component('room', {
			templateUrl: 'tmpl/room.html',
			controllerAs: 'model',
			controller: function(dataService) {
				var model = this;
				var swiper;

				model.$routerOnActivate = function(next) {
					var hotelId = next.params.hotelId;
					var roomId = next.params.roomId;

					model.hotelId = hotelId;
					model.id = roomId;

					dataService.getRoom(hotelId, roomId)
						.then(function(data) {
							model.room = data;

							swiper = new Swiper('.swiper', {
								loop: true,
								speed: 400,
								nextButton: '.swiper-next',
								prevButton: '.swiper-prev'
							});
						});
				};

				model.$onDestroy = function() {
					swiper.destroy();
				};
			}
		});
})();