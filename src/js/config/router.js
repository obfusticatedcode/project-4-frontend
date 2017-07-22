angular
  .module('desireApp')
  .config(Router);

// Injecting the dependencies we need to ensure the file works after minification
Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

// defining the router function to create our routes
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  //routes to be completed
  $stateProvider
    .state('productsIndex', {
      url: '/products',
      templateUrl: '/js/views/products/index.html'
    })
    .state('productsNew', {
      url: '/products/new',
      templateUrl: '/js/views/products/new.html'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/js/views/auth/register.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/js/views/auth/login.html'
    });

  $urlRouterProvider.otherwise('/products');

}
