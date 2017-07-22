angular
  .module('desireApp')
  .config(Router);

// Injecting the dependencies we need to ensure the file works after minification
Router.$inject = ['$stateProvider', '$locationProvider'];

// defining the router function to create our routes
function Router($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  //routes to be completed
  $stateProvider
    .state('productsIndex', {
      url: '/products',
      templateUrl: '/js/views/products/index.html',
      controller: 'Products as products'
    })
    .state('productsNew', {
      url: '/products/new',
      templateUrl: '/js/views/products/new.html'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: 'js/views/users/profile.html'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/js/views/auth/register.html',
      controller: 'Register as register'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/js/views/auth/login.html',
      controller: 'Login as login'
    });

    // removed $urlRouterProvider as it was causing a facebook login bug I'll catch the invalid routes another way

}
