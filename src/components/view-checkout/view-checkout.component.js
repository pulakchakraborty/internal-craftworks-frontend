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

    subtotal(products) {
        var total = 0;
        for (var i = 0; i < products.length; i++) {
            var product = products[i];
            total += parseInt(product.price);
        }
        return total;
    };

    cancel() {
        this.$state.go('app.offers', {});
    };

    checkout() {
        this.$state.go('app.checkoutsuccess', {});
    };

    $onInit(){
        // user information would be stored in userFromApi variable which would be accessible in the html template as well
        this.userFromApi = {};

        this.UserService.getCurrentUserInfo(this.UserService.getCurrentUser()._id).then(data => {
            this.userFromApi = JSON.parse(JSON.stringify(data));
            console.log(this.userFromApi);
        });

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


    init(){
        paypal.Button.render({

            env: 'sandbox', // sandbox | production

            client: {
                sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
                production: 'ARpexpnsoXMeLydUtEb9fmX3hxzAO65betV3qcUrWPlKByp_97dCWxew5cizEhF1FkTkq4XQWTlbLGQV'
            },

            // Show the buyer a 'Pay Now' button in the checkout flow
            commit: true,

            // payment() is called when the button is clicked
            payment: function(data, actions) {

                // Make a call to the REST api to create the payment
                return actions.payment.create({
                    payment: {
                        transactions: [
                            {
                                amount: { total: '0.01', currency: 'EUR' }
                            }
                        ]
                    }
                });
            },

            // onAuthorize() is called when the buyer approves the payment
            onAuthorize: function(data, actions) {

                // Make a call to the REST api to execute the payment
                return actions.payment.execute().then(function() {
                    window.alert('Payment Complete!');
                });
            }

        }, '#paypal-button-container');
    };

    static get $inject() {
        return ['$state', UserService.name, ProductsService.name, '$cookies'];
    };
}

export default CheckOutComponent;
