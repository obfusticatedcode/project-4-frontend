
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
FeaturesShowCtrl.$inject = ['Feature', 'User','Comment','$stateParams','$state', '$auth', 'tone'];
function FeaturesShowCtrl(Feature, User,Comment, $stateParams, $state, $auth, tone) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  Feature.get($stateParams)
          .$promise
          .then((feature) => {
            vm.feature = feature;
            console.log('This is a feature',feature.description);
            tone.getTone(feature.description)
                .then((response) => {
                  console.log(response);
                });
          });

  function featureDelete(){
    vm.feature
    .$remove()
    .then(() => {
      $state.go('productsIndex');
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

  // testing

  function hello(){
    console.log(`hello`);
  }

  vm.hello = hello;

}


//edit
FeaturesEditCtrl.$inject = ['Feature', 'User', '$state'];
function FeaturesEditCtrl(Feature, User, $state) {
  const vm = this;


  Feature.get($state.params).$promise.then((feature)=> {
    vm.feature = feature;
  });

  vm.users = User.query();

  function featuresUpdate() {
    Feature
    .update({ id: vm.feature.id }, vm.feature)
    .$promise
    .then(() => $state.go('featuresShow', { id: vm.feature.id }));

  }

  vm.update = featuresUpdate;


}//end of the productsEditCtrl function
