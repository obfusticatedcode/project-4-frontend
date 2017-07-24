angular
  .module('desireApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$http', 'API_URL', '$rootScope', '$state', '$auth', '$transitions'];
function MainCtrl($http, API_URL, $rootScope, $state, $auth, $transitions) {
  const vm = this;
  vm.isNavCollapsed = true;
  //hide and show DOM elements based on authentication
  vm.isAuthenticated = $auth.isAuthenticated;


  $rootScope.$on('error', (e, err) => {
    vm.message = err.data.message;
    if(err.status === 401 && vm.pageName !== 'login') {
      if(vm.pageName !== '/') vm.stateHasChanged = false;
      $state.go('login');
    }
  });

  // protecting some states/routes if the user isn't loggged in
  const protectedStates = ['productsNew', 'productsEdit'];

  $transitions.onSuccess({}, (transition) => {
    if((!$auth.isAuthenticated() && protectedStates.includes(transition.$to().name))) {
      vm.message = 'You must be logged in to access this page.';
      $state.target('login');
    }


    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    vm.isNavCollapsed = true;
    vm.pageName = transition.$to().name; // Storing the current state name as a string
    if($auth.getPayload()) vm.currentUserId = $auth.getPayload().id;
  
  });

  function logout() {
    $auth.logout();
    $state.go('login');
  }

  vm.logout = logout;

}
