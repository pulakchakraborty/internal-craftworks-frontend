/**
 * Created by barbaraprommegger on 26/06/2017.
 */

'use strict';

import template from './view-shoppingcart.template.html';
import UserService from './../../services/user/user.service';
import ProductsService from './../../services/products/products.service';
import './view-shoppingcart.style.css';


class ViewShoppingCartComponent {
    constructor(){
        this.controller = ViewShoppingCartComponentController;
        this.template = template;
        this.bindings = {
            
        }
    }

    static get name() {
        return 'viewShoppingCart';
    }


}

class ViewShoppingCartComponentController{
    constructor($state,UserService,ProductsService, $cookies, $mdToast){
        this.$state = $state;
        this.UserService = UserService;
        this.ProductsService = ProductsService;
        this.$mdToast = $mdToast;

        this.products = [];

        this.$cookies = $cookies;

        const productsInCart = $cookies.getObject('shoping_cart');
 
        if (productsInCart) {
            ProductsService.getSpecificProducts({ids: productsInCart.map( (p) => { return p.id;} )})
                .then( (res) => {
                    this.products = res;
                    this.products.forEach( (product) => {
                        product.q = null;
                        productsInCart.forEach( (pInCart) => {
                            if (pInCart.id === product._id) {
                                product.q = pInCart.q;
                            }
                        })
                        this.priceCalculate();
                    }, this);
                }).catch( (err) => {
                    console.log(err);
                })
        };
    }

    details (product) {
        let _id = product['_id'];
        this.$state.go('product',{ productId:_id});
    };



    subtotal(products) {
        var total = 0;
        for (var i = 0; i < products.length; i++) {
            var product = products[i];
                total += parseInt(product.price || 0);
        }
        this.delivery(total);
        return total;

    };

    delivery(total) {
        var deliverycost = total > 100 ? 0 : 10;
        this.deliverycostPrice = deliverycost;
        return deliverycost;
    };

    cancel() {
        this.$state.go('app.offers',{});
    };

    checkout(product) {
        console.log(product);
        if (this.UserService.isAuthenticated()) {
            if(product.length !== 0) {
                this.$state.go('app.checkout',);
            } else {
                this.$mdToast.show(
                    this.$mdToast.simple()
                        .toastClass('md-toast-error')
                        .textContent('There are no items in your shopping cart! Go shopping! :)')
                        .position('bottom right')
                        .hideDelay(5000)
                );
            }

        } else {
            this.$state.go('app.login',{});
        }
    };

    delete (product) {
        const savedProducts = this.$cookies.getObject('shoping_cart');
        savedProducts.forEach( (item, i) => {
            if (item.id === product._id) {
                savedProducts.splice(i, 1);
            }
        })
        this.$cookies.putObject('shoping_cart', savedProducts);

        this.products.forEach( (item, i) => {
            if (item._id === product._id) {
                this.products.splice(i, 1);
            }
        });

        this.priceCalculate();
    }

    priceCalculate () {
        this.subtotalPrice = 0;
        this.totalPrice = 0;

        let subtotalPrice = 0;

        this.products.forEach( (item) => {
            subtotalPrice += item.price * (item.q || 1);
        });

        this.subtotalPrice = subtotalPrice;
        this.totalPrice = subtotalPrice + this.delivery(subtotalPrice);
    }

    qChange (product) {
        const savedProducts = this.$cookies.getObject('shoping_cart');
        savedProducts.forEach( (item) => {
            if (item.id === product._id) {
                item.q = parseInt(product.q);
            }
        })
        this.$cookies.putObject('shoping_cart', savedProducts);

        this.priceCalculate();
    }

    static get $inject(){
        return ['$state', UserService.name, ProductsService.name, '$cookies', '$mdToast'];
    };
}

export default ViewShoppingCartComponent;
