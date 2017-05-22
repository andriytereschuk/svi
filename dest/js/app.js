'use strict';

(function() {
	const elem = document.querySelector('html');
	const lang = elem.getAttribute('lang');
	angular.module('app', ['ngComponentRouter', 'pascalprecht.translate'])
		.config(function($translateProvider) {
			$translateProvider.determinePreferredLanguage(function() {
				return lang || 'ua';
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
				{ path: lang + '/homes/', component: 'hotels', name: 'Hotels', useAsDefault: true },
				{ path: lang + '/homes/:id', component: 'hotel', name: 'Hotel' },
				{ path: lang + '/homes/:hotelId/rooms/:roomId', component: 'room', name: 'Room' }
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
			controller: function(dataService, $timeout) {
				var model = this;
				var swiper;

				model.$routerOnActivate = function(next) {
					var id = next.params.id;
					model.id = id;

					dataService.getHotel(id)
						.then(function(data) {
							var isLooped = false;
							model.hotel = data;

							if (model.hotel.images.length > 1) {
								isLooped = true;
							}

							$timeout(function() {
								swiper = new Swiper('.swiper', {
									speed: 400,
									loop: isLooped,
									grabCursor: true,
									// preloadImages: false,
									// lazyLoading: true,
									nextButton: '.swiper-next',
									prevButton: '.swiper-prev'
								});

								if (isLooped) {
									swiper.prevButton[0].style.display = 'block';
									swiper.nextButton[0].style.display = 'block';
								} else {
									swiper.prevButton[0].style.display = 'none';
									swiper.nextButton[0].style.display = 'none';
								}
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
			controller: function(dataService, $timeout) {
				var model = this;
				var swiper;

				model.$routerOnActivate = function(next) {
					var hotelId = next.params.hotelId;
					var roomId = next.params.roomId;

					model.hotelId = hotelId;
					model.id = roomId;

					dataService.getRoom(hotelId, roomId)
						.then(function(data) {
							var isLooped = false;
							model.room = data;

							if (model.room.images.length > 1) {
								isLooped = true;
							}

							$timeout(function() {
								swiper = new Swiper('.swiper', {
									speed: 400,
									loop: isLooped,
									grabCursor: true,
									nextButton: '.swiper-next',
									prevButton: '.swiper-prev'
								});

								if (isLooped) {
									swiper.prevButton[0].style.display = 'block';
									swiper.nextButton[0].style.display = 'block';
								} else {
									swiper.prevButton[0].style.display = 'none';
									swiper.nextButton[0].style.display = 'none';
								}
							});
						});
				};

				model.$onDestroy = function() {
					swiper.destroy();
				};
			}
		});
})();