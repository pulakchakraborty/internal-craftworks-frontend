'use strict';

import template from './view-products-seller.template.html';
import UserService from './../../services/user/user.service';
import ProductsService from './../../services/products/products.service';
import './view-products-seller.style.css';


class ViewProductsSellerComponent {
    constructor(){
        this.controller = ViewProductsSellerComponentController;
        this.template = template;
        this.bindings = {
            products: '<',
        }
    }

    static get name() {
        return 'viewProductsSeller';
    }

}

class ViewProductsSellerComponentController{
    constructor($state,UserService,ProductsService,$mdToast){
        this.$state = $state;
        this.UserService = UserService;
        this.ProductsService = ProductsService;
        this.$mdToast = $mdToast;
    }

    //change product details
    edit (product) {
        if (this.UserService.isAuthenticated()) {
            let _id = product['_id'];
            this.$state.go('app.productEdit',{ productId:_id});
        } else {
            this.$state.go('login',{});
        }
    };


    newProduct(){
        if (this.UserService.isAuthenticated()) {
            this.$state.go('productAdd',{});
        } else {
            this.$state.go('login',{});
        }
    }

    //delets product from the database
    delete(product) {
        if (this.UserService.isAuthenticated()) {
            let _id = product['_id'];
            this.ProductsService.delete(_id).then(response => {
                let index = this.products.map(x => x['_id']).indexOf(_id);
                this.products.splice(index, 1);
                this.$mdToast.show(
                    this.$mdToast.simple()
                        .toastClass('md-success-toast-theme')
                        .textContent('The product has been removed from your offers')
                        .position('bottom right')
                        .hideDelay(5000)
                );
            })
    //if user is not logged in, go to login
        } else {
            this.$state.go('login',{});
        }
    };

    //go to Details of the product
    goToProductDetails(product_id) {
        this.$state.go('app.productDetail',{ productId: product_id });
    }

    static get $inject(){
        return ['$state', UserService.name, ProductsService.name, '$mdToast'];
    }

}

export default ViewProductsSellerComponent;
