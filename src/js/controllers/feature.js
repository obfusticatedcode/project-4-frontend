
angular
.module('desireApp')
.controller('FeaturesIndexCtrl', FeaturesIndexCtrl)
.controller('FeaturesNewCtrl', FeaturesNewCtrl)
.controller('FeaturesShowCtrl', FeaturesShowCtrl)
.controller('FeaturesEditCtrl', FeaturesEditCtrl);

//index
FeaturesIndexCtrl.$inject = ['Feature', 'User', 'Product'];
function FeaturesIndexCtrl(Feature, User, Product) {
  const vm = this;

  vm.all = Feature.query();
  vm.products = Product.query();
  vm.users = User.query();
  console.log('The users are:', vm.users);
}

//new
FeaturesNewCtrl.$inject = ['Feature','User','$state'];
function FeaturesNewCtrl(Feature, User, $state) {
  const vm = this;
  vm.newFeature = {};
  vm.addFeature = addFeature;

  vm.all = Feature.query();
  vm.users = User.query();


  function addFeature() {
    Feature
    .save(vm.newFeature)
    .$promise
    .then((feature) => {
      console.log(feature);
      vm.all.push(feature);
      $state.go('featuresIndex');
    });
  }

}

//show
FeaturesShowCtrl.$inject = ['Feature', 'User','Comment','$stateParams','$state', '$auth'];
function FeaturesShowCtrl(Feature, User,Comment, $stateParams, $state, $auth) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  vm.feature = Feature.get($stateParams);

  function featureDelete(){

    vm.feature
    .$remove()
    .then(() => {
      $state.go('featuresIndex');
    });
  }

  vm.delete = featureDelete;

  //comments
  function addComment() {
    vm.comment.feature_id = vm.feature.id;

    Comment
    .save(vm.comment)
    .$promise
    .then((comment) => {
      vm.feature.comments.push(comment);
      vm.comment = {};
    });
  }

  vm.addComment = addComment;

  function deleteComment(comment) {
    Comment
    .delete({ id: comment.id })
    .$promise
    .then(() => {
      const index = vm.feature.comments.indexOf(comment);
      vm.feature.comments.splice(index, 1);
      $state.go('productsIndex');
    });
  }

  vm.deleteComment = deleteComment;
}


//edit
FeaturesEditCtrl.$inject = ['Feature', 'User','$stateParams','User', '$state'];
function FeaturesEditCtrl(Feature, User, $stateParams, $state) {
  const vm = this;

  vm.users = User.query();

  vm.feature = Feature.get($stateParams);
  console.log($stateParams);
  function featuresUpdate() {

    vm.feature
    .$update({ id: vm.feature.id }, vm.feature)
    .then(() => $state.go('featuresShow', $stateParams));

  }

  vm.update = featuresUpdate;


}//end of the featuresEditCtrl function
