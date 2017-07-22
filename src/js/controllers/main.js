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

  $transitions.onSuccess({}, (transition) => {
    vm.pageName = transition.$to().name; // Storing the current state name as a string
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    vm.isNavCollapsed = true;
    if($auth.getPayload()) vm.currentUserId = $auth.getPayload().userId;
  });

  function logout() {
    $auth.logout();
    $state.go('login');
  }

  vm.logout = logout;

}
