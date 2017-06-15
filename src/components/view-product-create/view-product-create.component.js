
'use strict';

import template from './view-product-create.template.html';

import ProductsService from './../../services/products/products.service';
import UserService from './../../services/user/user.service';
import './view-product-create.style.css';

class ViewProductCreateComponent {
    constructor(){
        this.controller = ViewProductCreateComponentController;
        this.template = template;
    }

    static get name() {
        return 'viewProductCreate';
    }
}

class ViewProductCreateComponentController{
    constructor($state, ProductsService,UserService){
        this.product = {};
        this.product.color = [];
        this.$state = $state;
        this.ProductsService = ProductsService;
        this.UserService = UserService;
    }

    cancel() {
        this.$state.go('app.offers',{});
    };

    save() {
        let user = this.UserService.getCurrentUser();

        this.product['seller'] = user['_id'];
        this.ProductsService.create(this.product).then(data => {
            let _id = data['_id'];
            this.$state.go('app.offers',{});
        });

    };
    newProduct(){
        this.$state.go('productAdd',{});
    }


    static get $inject(){
        return ['$state', ProductsService.name, UserService.name];
    }

}


export default ViewProductCreateComponent;
