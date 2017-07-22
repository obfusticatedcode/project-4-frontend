angular
.module('desireApp')
.config(Auth);

Auth.$inject = ['$authProvider', 'API_URL'];
function Auth($authProvider, API_URL) {
  $authProvider.signupUrl = `${API_URL}/register`;
  $authProvider.loginUrl = `${API_URL}/login`;

  //github
  $authProvider.github({
    clientId: '677f0acf36b1e4634b83',
    url: `${API_URL}/oauth/github`
  });

  //facebook
  $authProvider.facebook({
    clientId: '450821241962493',
    url: `${API_URL}/oauth/facebook`
  });

  //instagram
  $authProvider.instagram({
    clientId: '6310d5518303449d8a24e0ed80ee8c69',
    url: `${API_URL}/oauth/instagram`
  });
}
