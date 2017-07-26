
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
    console.log(product);
    product.$upvote()
      .then((res) => {
        console.log(res);
        product = res;
      });
    toggle();
  }


  function downvote(product) {
    product.$downvote()
      .then((res) => {
        console.log(res);
        product = res;
      });
  }

  function toggle() {
    vm.heart = false;
  }

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


  //array of categories
  vm.categories = [
    { name: 'Food & Drink' },
    { name: 'Sports'},
    { name: 'Automotive'},
    { name: 'Property'},
    { name: 'Games'},
    { name: 'Apparel'},
    { name: 'Appliances'},
    { name: 'Beauty'},
    { name: 'Books'},
    { name: 'Movies'},
    { name: 'Electronics'},
    { name: 'Furniture'},
    { name: 'GiftCards'},
    { name: 'Grocery'},
    { name: 'Jewelry'},
    { name: 'Music'},
    { name: 'Shoes'},
    { name: 'Software'},
    { name: 'Social Media'}
  ];
  vm.myCategory = vm.categories[2]; // default option

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

  function upvote(feature) {
    Feature
      .upvote({ id: feature.id })
      .$promise
      .then(updateFeatures);
  }

  function downvote(feature) {
    Feature
      .downvote({ id: feature.id })
      .$promise
      .then(updateFeatures);
  }

  function updateFeatures() {
    Product.get($stateParams)
      .$promise
      .then((product) => {
        vm.product.features = product.features;
      });
  }

  vm.upvote = upvote;
  vm.downvote = downvote;
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

  //array of categories
  vm.categories = [
    { name: 'Food & Drink' },
    { name: 'Sports'},
    { name: 'Automotive'},
    { name: 'Property'},
    { name: 'Games'},
    { name: 'Apparel'},
    { name: 'Appliances'},
    { name: 'Beauty'},
    { name: 'Books'},
    { name: 'Movies'},
    { name: 'Electronics'},
    { name: 'Furniture'},
    { name: 'GiftCards'},
    { name: 'Grocery'},
    { name: 'Jewelry'},
    { name: 'Music'},
    { name: 'Shoes'},
    { name: 'Software'},
    { name: 'Social Media'}
  ];
  vm.myCategory = vm.categories[2]; // default option

}//end of the productsEditCtrl function
