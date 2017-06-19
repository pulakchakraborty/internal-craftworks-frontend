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
    constructor($state,UserService,ProductsService){
        this.$state = $state;
        this.UserService = UserService;
        this.ProductsService = ProductsService;

    }

    details (product) {
        let _id = product['_id'];
        this.$state.go('product',{ productId:_id});
    };

    edit (product) {

        if (this.UserService.isAuthenticated()) {
            let _id = product['_id'];
            this.$state.go('productEdit',{ productId:_id});
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


    delete(product) {
        if (this.UserService.isAuthenticated()) {
            let _id = product['_id'];

            this.ProductsService.delete(_id).then(response => {
                let index = this.products.map(x => x['_id']).indexOf(_id);
                this.products.splice(index, 1);
            })

        } else {
            this.$state.go('login',{});
        }
    };


    static get $inject(){
        return ['$state', UserService.name, ProductsService.name];
    }

}

export default ViewProductsSellerComponent;
