angular
  .module('desireApp')
  .factory('Comment', Comment);

Comment.$inject = ['$resource', 'API_URL'];
function Comment($resource, API_URL) {
  return new $resource(`${API_URL}/comments/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
