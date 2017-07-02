/**
 * Created by barbaraprommegger on 26/06/2017.
 */

'use strict';

import template from './view-checkout.template.html';
import UserService from './../../services/user/user.service';
import ProductsService from './../../services/products/products.service';
import './view-checkout.style.css';


class CheckOutComponent {
    constructor(){
        this.controller = CheckOutComponentController;
        this.template = template;
        this.bindings = {
            products: '<',
        }
    }

    static get name() {
        return 'viewCheckOut';
    }


}

class CheckOutComponentController{
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







}

export default CheckOutComponent;
