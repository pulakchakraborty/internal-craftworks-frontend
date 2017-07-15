'use strict';

import template from './view-offers.template.html';
import UserService from './../../services/user/user.service';
import ProductsService from './../../services/products/products.service';
import ShoppingcartService from './../../services/shoppingcart/shoppingcart.service';
import './view-offers.style.css';


class ViewOffersComponent {
    constructor(){
        this.controller = ViewOffersComponentController;
        this.template = template;
        this.bindings = {
            products: '<',
        }
    }

    static get name() {
        return 'viewOffers';
    }


}

class ViewOffersComponentController{
    constructor($state,UserService,ProductsService, ShoppingcartService, $cookies){
        this.$state = $state;
        this.UserService = UserService;
        this.ProductsService = ProductsService;
        this.ShoppingcartService = ShoppingcartService;
        this.shoppingCart = [];
        this.$cookies = $cookies;
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

    goToProductDetails(product_id) {
        this.$state.go('app.productDetail',{ productId: product_id });
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

    addtoShoppingCart(product) {
        let _id = product['_id'];
        const savedItems = this.$cookies.getObject('shoping_cart');
        if (savedItems) {
            let q = 0;
            const exist = savedItems.some( (element) => {
                if (product._id === element.id) {
                    q = element.q;
                    return true;
                }
            }, this);
            if (exist) {
                for(let i = 0; i < savedItems.length; i++) {
                    let item = savedItems[i];
                    if (item.id === product._id) {
                        item.q += 1;
                        this.$cookies.putObject( 'shoping_cart', savedItems);
                        break;
                    }
                }
            } else {
                this.$cookies.putObject( 'shoping_cart', savedItems.push({id: _id, q: 1}) && savedItems );
            }
        } else {
            this.$cookies.putObject( 'shoping_cart', [{id: _id, q: 1}] );
        }
        console.log(this.$cookies.getObject('shoping_cart'));
    }


    static get $inject(){
        return ['$state', UserService.name, ProductsService.name, ShoppingcartService.name, '$cookies'];
    }

}

export default ViewOffersComponent;
