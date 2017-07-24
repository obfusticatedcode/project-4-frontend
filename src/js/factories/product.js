angular
  .module('desireApp')
  .factory('Product', Product);

Product.$inject = ['$resource', 'API_URL'];
function Product($resource, API_URL) {
  return new $resource(`${API_URL}/products/:id`, { id: '@id' }, {
    update: { method: 'PUT'},
    upvote: { method: 'PUT', url: `${API_URL}/products/:id/upvote` },
    downvote: { method: 'PUT', url: `${API_URL}/products/:id/downvote` }
  });
}
