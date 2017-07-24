angular
  .module('desireApp')
  .controller('UsersShowCtrl',UsersShowCtrl);

UsersShowCtrl.$inject = ['$auth', 'User', '$state'];
function UsersShowCtrl($auth, User, $state) {
  const vm = this;

  vm.user = User.get($state.params);

}
