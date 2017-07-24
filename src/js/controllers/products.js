
angular
.module('desireApp')
.controller('ProductsIndexCtrl', ProductsIndexCtrl)
.controller('ProductsNewCtrl', ProductsNewCtrl)
.controller('ProductsShowCtrl', ProductsShowCtrl)
.controller('ProductsEditCtrl', ProductsEditCtrl);

//index
ProductsIndexCtrl.$inject = ['Product', 'User'];
function ProductsIndexCtrl(Product, User) {
  const vm = this;

  vm.all = Product.query();
  vm.users = User.query();
  console.log('The users are:', vm.users);
}

//new
ProductsNewCtrl.$inject = ['Product','User','$state'];
function ProductsNewCtrl(Product, User, $state) {
  const vm = this;
  vm.newProduct = {};
  vm.addProduct = addProduct;

  vm.all = Product.query();
  vm.users = User.query();


  function addProduct() {
    Product
    .save(vm.newProduct)
    .$promise
    .then((product) => {
      console.log(product);
      vm.all.push(product);
      $state.go('productsIndex');
    });
  }

}

//show
ProductsShowCtrl.$inject = ['Product', 'User','Feature','$stateParams','$state', '$auth'];
function ProductsShowCtrl(Product, User,Feature, $stateParams, $state, $auth) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  vm.product = Product.get($stateParams);

  function productDelete(){

    vm.product
    .$remove()
    .then(() => {
      $state.go('productsIndex');
    });
  }

  vm.delete = productDelete;

  //features
  function addFeature() {
    vm.feature.product_id = vm.product.id;

    Feature
    .save(vm.feature)
    .$promise
    .then((feature) => {
      vm.product.features.push(feature);
      vm.feature = {};
    });
  }

  vm.addFeature = addFeature;

  function deleteFeature(feature) {
    Feature
    .delete({ id: feature.id })
    .$promise
    .then(() => {
      const index = vm.product.features.indexOf(feature);
      vm.product.features.splice(index, 1);
    });
  }

  vm.deleteFeature = deleteFeature;
}


//edit
ProductsEditCtrl.$inject = ['Product', 'User','$stateParams','User', '$state'];
function ProductsEditCtrl(Product, User, $stateParams, $state) {
  const vm = this;

  vm.users = User.query();

  vm.product = Product.get($stateParams);
  console.log($stateParams);
  function productsUpdate() {

    vm.product
    .$update({ id: vm.product.id }, vm.product)
    .then(() => $state.go('productsShow', $stateParams));

  }

  vm.update = productsUpdate;


}//end of the productsEditCtrl function
