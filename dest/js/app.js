'use strict';

(function() {
	angular.module('app', ['ngComponentRouter'])
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
					$http.get('api/hotels.json')
						.then(function(response) {
							model.hotels = response.data;
						});
				};
			}
		})
		.component('hotel', {
			templateUrl: 'tmpl/hotel.html',
			controllerAs: 'model',
			controller: function() {
				var model = this;

				model.$routerOnActivate = function(next) {
					model.id = next.params.id;
				};
			}
		})
		.component('rooms', {
			templateUrl: 'tmpl/rooms.html'
		});
})();