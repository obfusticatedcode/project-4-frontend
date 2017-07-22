angular
  .module('desireApp')
  .controller('Products', Products);

Products.$inject = ['Product'];
function Products(Product) {
  const vm = this;

  vm.all = Product.query();
  
}
