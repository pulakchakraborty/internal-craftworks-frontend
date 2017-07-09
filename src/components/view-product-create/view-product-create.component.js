
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
        //this.category = CategoryService.getCategory();
        //this.subcategory = CategoryService.getSubcategory(this.product.subcategory);
        this.product = {};
        this.$state = $state;
        this.ProductsService = ProductsService;
        this.UserService = UserService;
    }

    cancel() {
        this.$state.go('app.offers',{});
    };

    save() {
        console.log(this.product);
        let user = this.UserService.getCurrentUser();
        let seller_Id = user['_id'];
        this.product['seller'] = user['_id'];
        this.ProductsService.create(this.product).then(data => {
            let _id = data['_id'];
            this.$state.go('app.product.productsSeller',{sellerId:seller_Id});
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
