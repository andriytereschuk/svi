'use strict';

(function() {

	const data = [
		{
			'id': 1,
			'img': 'gallery/hotels/temp.jpg',
			'rooms': 15,
			'price': 150,
			'rating': 5
		},
		{
			'id': 2,
			'img': 'gallery/hotels/temp.jpg',
			'rooms': 2,
			'price': 150,
			'rating': 5
		},
		{
			'id': 3,
			'img': 'gallery/hotels/temp.jpg',
			'rooms': 4,
			'price': 100,
			'rating': 4
		},
		{
			'id': 4,
			'img': 'gallery/hotels/temp.jpg',
			'rooms': 5,
			'price': 100,
			'rating': 4
		}
	];
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
			controller: function() {
				var model = this;

				model.hotels = data;
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