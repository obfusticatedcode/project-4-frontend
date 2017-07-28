angular
  .module('desireApp')
  .controller('UsersShowCtrl',UsersShowCtrl)
  .controller('UsersEditCtrl',UsersEditCtrl);

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
UsersEditCtrl.$inject = ['User',  '$state'];
function UsersEditCtrl(User, $state) {
  const vm = this;

  User.get($state.params).$promise.then((user)=> {
    vm.user = user;
    console.log(vm.user);
  });

  function usersUpdate() {
    User
      .update({ id: vm.user.id }, vm.user)
      .$promise
      .then(() => $state.go('usersShow', { id: vm.user.id }));
  }


  vm.update = usersUpdate;
}
