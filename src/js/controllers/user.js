angular
  .module('desireApp')
  .controller('UsersShow',UsersShow);

UsersShow.$inject = ['$auth', 'User', '$state'];
function UsersShow($auth, User, $state) {
  const vm = this;

  vm.user = User.get($state.params);

}
