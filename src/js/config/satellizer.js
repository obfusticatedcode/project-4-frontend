angular
  .module('desireApp')
  .config(Auth);

Auth.$inject = ['$authProvider'];
function Auth($authProvider) {
  $authProvider.registerUrl = '/api/register';
  $authProvider.loginUrl = '/api/login';
}
