angular
  .module('desireApp')
  .factory('User', User);

User.$inject = ['$resource', 'API_URL'];
function User($resource, API_URL) {
  return new $resource(`${API_URL}/users/:id`, { id: '@id' }, {
    update: { method: 'PUT'}
  });

}
