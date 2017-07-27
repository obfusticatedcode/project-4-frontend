angular
  .module('desireApp')
  .service('tone', Tone);

Tone.$inject = ['$http', 'API_URL'];
function Tone($http, API_URL) {

  this.getTone = function getTone(comment) {
    return $http({
      method: 'POST',
      url: `${API_URL}/tone`,
      data: JSON.stringify(comment)
    })
    .then((response) => {
      console.log('From rails server',response);
    });
  };

}
