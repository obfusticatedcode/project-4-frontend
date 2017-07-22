angular
  .module('desireApp')
  .controller('Register', Register)
  .controller('Login', Login);

Register.$inject = ['$auth', '$state'];
function Register($auth, $state) {
  const vm = this;
  vm.user = {};

  function submit() {
    $auth.register(vm.user)
      .then(() => $state.go('login'));
  }

  vm.submit = submit;
}

Login.$inject = [ '$auth', '$state'];
function Login($auth, $state) {
  const vm = this;
  vm.credentials = {};

  function submit() {
    $auth.login(vm.credentials)
      .then(() => $state.go('products'));
  }

  vm.submit = submit;
}
