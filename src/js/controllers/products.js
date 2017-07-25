
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

  function upvote(product) {
    // console.log(product);
    product.$upvote()
      .then((res) => {
        console.log(res);
        product = res;
        // product.upvotes += 1;
        // product.downvotes -= 1;

      });
  }



  function downvote(product) {
    product.$downvote()
      .then((res) => {
        console.log(res);
        product = res;
        // product.downvotes += 1;
        // product.upvotes -= 1;

      });
  }
  // setInterval();
  vm.upvote = upvote;
  vm.downvote = downvote;

}

//new
ProductsNewCtrl.$inject = ['Product','User','$state'];
function ProductsNewCtrl(Product, User, $state) {
  const vm = this;
  vm.product = {};
  vm.addProduct = addProduct;

  vm.all = Product.query();
  vm.users = User.query();


  function addProduct() {
    Product
    .save(vm.product)
    .$promise
    .then((product) => {
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
ProductsEditCtrl.$inject = ['Product', 'User', '$state'];
function ProductsEditCtrl(Product, User, $state) {
  const vm = this;


  Product.get($state.params).$promise.then((product)=> {
    vm.product = product;
  });

  vm.users = User.query();

  function productsUpdate() {
    Product
    .update({ id: vm.product.id }, vm.product)
    .$promise
    .then(() => $state.go('productsShow', { id: vm.product.id }));

  }

  vm.update = productsUpdate;


}//end of the productsEditCtrl function
