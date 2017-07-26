angular
  .module('desireApp')
  .controller('UsersShowCtrl',UsersShowCtrl);

UsersShowCtrl.$inject = ['$auth', 'User', '$state'];
function UsersShowCtrl($auth, User, $state) {
  const vm = this;

  vm.user = User.get($state.params);


  function usersDelete() {
    vm.user
    .$remove()
    .then(() => $state.go('register'));
  }

  vm.delete = usersDelete;

}


//edit/update
UsersEditCtrl.$inject = ['User', '$stateParams', '$state'];
function UsersEditCtrl(User, $stateParams, $state) {
  const vm = this;

  vm.user = User.get($stateParams);

  function usersUpdate() {
    if (vm.userForm.$valid) {
      vm.user
        .$update()
        .then(() => $state.go('usersShow', $stateParams));
    }
  }

  vm.update = usersUpdate;
}
