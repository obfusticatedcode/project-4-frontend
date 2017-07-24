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
      controller: 'ProductsIndexCtrl as products'
    })
    .state('productsNew', {
      url: '/products/new',
      templateUrl: '/js/views/products/new.html',
      controller: 'ProductsNewCtrl as productsNew'
    })
    .state('productsShow', {
      url: '/products/:id',
      templateUrl: '/js/views/products/show.html',
      controller: 'ProductsShowCtrl as productsShow'
    })
    .state('productsEdit', {
      url: '/products/:id/edit',
      templateUrl: '/js/views/products/edit.html',
      controller: 'ProductsEditCtrl as productsEdit'
    })
    .state('featuresIndex', {
      url: '/features',
      templateUrl: '/js/views/features/index.html',
      controller: 'FeaturesIndexCtrl as features'
    })
    .state('featuresNew', {
      url: '/features/new',
      templateUrl: '/js/views/features/new.html',
      controller: 'FeaturesNewCtrl as featuresNew'
    })
    .state('featuresShow', {
      url: '/features/:id',
      templateUrl: '/js/views/features/show.html',
      controller: 'FeaturesShowCtrl as featuresShow'
    })
    .state('featuresEdit', {
      url: '/features/:id/edit',
      templateUrl: '/js/views/features/edit.html',
      controller: 'FeaturesEditCtrl as featuresEdit'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: 'js/views/users/profile.html',
      controller: 'UsersShowCtrl as usersShow'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/js/views/auth/register.html',
      controller: 'RegisterCtrl as register'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/js/views/auth/login.html',
      controller: 'LoginCtrl as login'
    });

    // removed $urlRouterProvider as it was causing a facebook login bug I'll catch the invalid routes another way

}
