/**
 * Created by barbaraprommegger on 26/06/2017.
 */

'use strict';

import template from './view-checkoutsuccess.template.html';
import UserService from './../../services/user/user.service';
import ProductsService from './../../services/products/products.service';
import './view-checkoutsuccess.style.css';


class CheckOutSuccessComponent {
    constructor(){
        this.controller = CheckOutSuccessComponentController;
        this.template = template;
        this.bindings = {
            products: '<',
        }
    }

    static get name() {
        return 'viewCheckOutSuccess';
    }


}

class CheckOutSuccessComponentController{
    constructor($state,UserService,ProductsService){
        this.$state = $state;
        this.UserService = UserService;
        this.ProductsService = ProductsService;

    }

    details (product) {
        let _id = product['_id'];
        this.$state.go('product',{ productId:_id});
    };


    static get $inject(){
        return ['$state', UserService.name, ProductsService.name];
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
        this.$state.go('app.offers',{});
    };

    getCurrentUserAdress(){
        let user = this.UserService.getCurrentUser();
        return user.username;
    };

    paypal() {

            var env    = 'sandbox';
            var client = AWi18rxt26-hrueMoPZ0tpGEOJnNT4QkiMQst9pYgaQNAfS1FLFxkxQuiaqRBj1vV5PmgHX_jA_c1ncL;
            return paypal.rest.payment.create(env, client, {
                transactions: [
                    {
                        amount: { total: '1.00', currency: 'USD' }
                    }
                ]
            });
        }






}

export default CheckOutSuccessComponent;
