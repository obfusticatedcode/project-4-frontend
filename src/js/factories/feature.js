angular
  .module('desireApp')
  .factory('Feature', Feature);

Feature.$inject = ['$resource', 'API_URL'];
function Feature($resource, API_URL) {
  return new $resource(`${API_URL}/features/:id`, { id: '@id' }, {
    update: { method: 'PUT'},
    upvote: { method: 'PUT', url: `${API_URL}/features/:id/upvote` },
    downvote: { method: 'PUT', url: `${API_URL}/features/:id/downvote` }
  });
}
