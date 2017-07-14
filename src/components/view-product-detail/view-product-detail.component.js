
'use strict';

import template from './view-product-detail.template.html';
import ProductsService from './../../services/products/products.service';
import UserService from './../../services/user/user.service';
import './view-product-detail.style.css';

class ViewProductDetailComponent {
    constructor(){
        this.controller = ViewProductDetailComponentController;
        this.template = template;
        this.bindings = {
            product: '<',
        }
    }

    static get name() {
        return 'viewProductDetail';
    }


}

class ViewProductDetailComponentController{
    constructor($state,ProductsService,UserService, $cookies){
        this.$state = $state;
        this.ProductsService = ProductsService;
        this.UserService = UserService;
        this.$cookies = $cookies;
    }


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
        return ['$state', ProductsService.name, UserService.name, '$cookies'];
    }

}

export default ViewProductDetailComponent;
