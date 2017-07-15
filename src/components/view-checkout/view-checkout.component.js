/**
 * Created by barbaraprommegger on 26/06/2017.
 */

'use strict';

import template from './view-checkout.template.html';
import UserService from './../../services/user/user.service';
import ProductsService from './../../services/products/products.service';
import OrdersService from './../../services/orders/orders.service';
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
    constructor($state, UserService, ProductsService, OrdersService, $cookies) {
        this.$state = $state;
        this.UserService = UserService;
        this.ProductsService = ProductsService;
        this.OrdersService = OrdersService;
        this.$cookies = $cookies;
        this.order = {};


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
        console.log(this.order);
        let user = this.UserService.getCurrentUser();
        this.OrdersService.create(this.order).then(data => {
            let _id = data['_id'];
            this.$state.go('app.checkoutsuccess', {});
        });
    };

    delivery(total) {
        var deliverycost = total > 100 ? 0 : 10;
        this.deliveryPrice = deliverycost;
        return deliverycost;
    };

    filladressfields(addressline1, city, state, zip) {
        this.order.addressLine1 = addressline1;
        this.order.zip = zip;
        this.order.state = state;
        this.order.city = city;
    };

    priceCalculate () {
        this.subtotalPrice = 0;
        this.totalPrice = 0;

        let subtotalPrice = 0;

        this.products.forEach( (item) => {
            subtotalPrice += item.price * (item.q || 1);
        })

        this.subtotalPrice = subtotalPrice;
        this.totalPrice = subtotalPrice + this.delivery(subtotalPrice);
        return this.totalPrice;
    }

    $onInit(){
        // user information would be stored in userFromApi variable which would be accessible in the html template as well
        this.userFromApi = {};

        this.UserService.getCurrentUserInfo(this.UserService.getCurrentUser()._id).then(data => {
            this.userFromApi = JSON.parse(JSON.stringify(data));
            console.log(this.userFromApi);
        });

/*        checkoutProducts(){
            this.buyingproducts = [];
            this.quantity = [];


            if (this.products.length != 0) {
                for (var i = 0; i < this.products.length; i++) {
                    this.buyingproducts = $scope.buyingproducts.concat(this.products[i].name);
                    this.quantity = $scope.buyingproducts.concat(this.products[i].q);
                }
            }

            this order.items = [];
            for (var i = 0; i < this.products.length; i++){
                items.push({
                    name: this.buyingproducts[i],
                    quantity: this.quantity[i],
                })
            }

        }*/




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
        this.price = this.priceCalculate();
        var price = parseInt(this.price);
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
                                amount: { total: price, currency: 'EUR' }
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
        return ['$state', UserService.name, ProductsService.name, OrdersService.name, '$cookies'];
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

}

export default CheckOutComponent;
