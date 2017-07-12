
'use strict';

import template from './view-product-create.template.html';

import ProductsService from './../../services/products/products.service';
import UserService from './../../services/user/user.service';
import CategoriesService from './../../services/categories/categories.service';
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
    constructor($state, ProductsService,UserService,CategoriesService){
        this.product = {};
        this.$state = $state;
        this.ProductsService = ProductsService;
        this.UserService = UserService;
        this.CategoriesService = CategoriesService;

    }

    $onInit() {
        this.categories = {};
        this.subcategories = {};
        //console.log(this.filter);
        //use category service
        this.CategoriesService.list().then(data => {
            this.categories = JSON.parse(JSON.stringify(data));
            console.log(this.categories);

            //this.$state.go('app.product.productsSeller',{sellerId:seller_Id});
        });

    };

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
    };

    onCategoryChange() {
        //console.log(this.filter.category);
        this.CategoriesService.getSubcategories(this.product.category).then(data => {
            this.subcategories = JSON.parse(JSON.stringify(data));
            //console.log(this.subcategories);
        });
    };

    static get $inject(){
        return ['$state', ProductsService.name, UserService.name, CategoriesService.name];
    };

}


export default ViewProductCreateComponent;
