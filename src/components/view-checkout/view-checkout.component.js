/**
 * Created by barbaraprommegger on 26/06/2017.
 */

'use strict';

import template from './view-checkout.template.html';
import UserService from './../../services/user/user.service';
import ProductsService from './../../services/products/products.service';
import './view-checkout.style.css';


class CheckOutComponent {
    constructor() {
        this.controller = CheckOutComponentController;
        this.template = template;
        this.bindings = {

        }
    }

    static get name() {
        return 'viewCheckOut';
    }


}

class CheckOutComponentController {
    constructor($state, UserService, ProductsService, $cookies) {
        this.$state = $state;
        this.UserService = UserService;
        this.ProductsService = ProductsService;
        this.$cookies = $cookies;
    }

    details(product) {
        let _id = product['_id'];
        this.$state.go('product', { productId: _id });
    };


    static get $inject() {
        return ['$state', UserService.name, ProductsService.name, '$cookies'];
    };

    subtotal(products) {
        var total = 0;
        for (var i = 0; i < products.length; i++) {
            var product = products[i];
            total += parseInt(product.price);
        }
        return total;

    };

    delivery(total) {
        if (total > 100) {
            return 10;
        } else {
            return 0;
        }
    };

    cancel() {
        this.$state.go('app.offers', {});
    };
    checkout() {
        this.$state.go('app.checkoutsuccess', {});
    };

    getCurrentUserAdress() {
        let user = this.UserService.getCurrentUser();
        return user.username;
    };

    paypal() {

        var env = 'sandbox';
        var client = AWi18rxt26 - hrueMoPZ0tpGEOJnNT4QkiMQst9pYgaQNAfS1FLFxkxQuiaqRBj1vV5PmgHX_jA_c1ncL;
        return paypal.rest.payment.create(env, client, {
            transactions: [
                {
                    amount: { total: '1.00', currency: 'USD' }
                }
            ]
        });
    }

    $onInit() {
        const productsInCart = this.$cookies.getObject('shoping_cart');

        if (productsInCart) {
            this.ProductsService.getSpecificProducts({ ids: productsInCart.map((p) => { return p.id; }) })
                .then((res) => {
                    this.products = res;
                    this.products.forEach((product) => {
                        product.q = null;
                        productsInCart.forEach((pInCart) => {
                            if (pInCart.id === product._id) {
                                product.q = pInCart.q;
                            }
                        })
                        console.log(productsInCart);
                        console.log(res);
                        this.priceCalculate();
                    }, this);
                }).catch((err) => {
                    console.log(err);
                })
        };
    }
}

export default CheckOutComponent;
