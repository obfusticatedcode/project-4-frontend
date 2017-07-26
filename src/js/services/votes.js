angular
  .module('desireApp')
  .service('votes', Votes);

Votes.$inject = [];
function Votes() {
  const vm = this;
  //upvote
  function upvote(product) {
    product.$upvote()
      .then((res) => {
        console.log(res);
        product = res;
      });
  }


  //downvote
  function downvote(product) {
    product.$downvote()
      .then((res) => {
        console.log(res);
        product = res;
      });
  }

  vm.upvote = upvote;
  vm.downvote = downvote;
}
