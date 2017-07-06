'use strict';

import template from './search-products.template.html';
import UserService from './../../services/user/user.service';
import ProductsService from './../../services/products/products.service';
import ShoppingcartService from './../../services/shoppingcart/shoppingcart.service';
import './search-products.style.css';


class SearchProductsComponent {
    constructor(){
        this.controller = SearchProductsComponentController;
        this.template = template;
        this.bindings = {
            results: '<',
        }
    }

    static get name() {
        return 'searchProducts';
    }


}

class SearchProductsComponentController{
    constructor($state,UserService,ProductsService,ShoppingcartService){
        this.$state = $state;
        this.UserService = UserService;
        this.ProductsService = ProductsService;
        this.ShoppingcartService = ShoppingcartService;
        this.shoppingCart = [];

    }

    /*details (product) {
        let _id = product['_id'];
        this.$state.go('product',{ productId:_id});
    };*/

    /*addtoShoppingCart(product) {
        let _id = product['_id'];
        this.ShoppingcartService.addItem(product,1);
    }*/


    static get $inject(){
        return ['$state', UserService.name, ProductsService.name, ShoppingcartService.name];
    }

}

export default SearchProductsComponent;
