
'use strict';

import template from './view-product-edit.template.html';

import ProductsService from './../../services/products/products.service';
import UserService from './../../services/user/user.service';
import CategoriesService from './../../services/categories/categories.service';
import './view-product-edit.style.css';

class ViewProductEditComponent {
    constructor(){
        this.controller = ViewProductEditComponentController;
        this.template = template;
        this.bindings = {
            product: '<',
        }
    }

    static get name() {
        return 'viewProductEdit';
    }
}

class ViewProductEditComponentController{
    constructor($state, ProductsService, UserService, CategoriesService){
        this.model = {};
        this.$state = $state;
        this.ProductsService = ProductsService;
        this.UserService = UserService;
        this.CategoriesService = CategoriesService;
    }

    $onInit() {
        //Clone the Product Data
        this.model = JSON.parse(JSON.stringify(this.product))
        this.categories = {};
        this.subcategories = {};
        // use category service to fetch the categories to be displayed at the select field
        this.CategoriesService.list().then(data => {
            this.categories = JSON.parse(JSON.stringify(data));
            console.log(this.categories);
        });
    };

    cancel() {
        this.model = JSON.parse(JSON.stringify(this.product));
        this.$state.go('app.offers',{});
    };

    save() {
        let user = this.UserService.getCurrentUser();
        let seller_Id = user['_id'];
        this.ProductsService.update(this.model).then(data => {
            this.product = JSON.parse(JSON.stringify(data));

            this.$state.go('app.product.productsSeller',{sellerId:seller_Id});
        });

    };

    delete() {
        let _id = this.product['_id'];

        this.ProductsService.delete(_id).then(response => {
            this.$state.go('app.offers',{});
        });
    };

    onCategoryChange() {
        //console.log(this.filter.category);
        this.CategoriesService.getSubcategories(this.model.category).then(data => {
            this.subcategories = JSON.parse(JSON.stringify(data));
            //console.log(this.subcategories);
        });
    };

    static get $inject(){
        return ['$state', ProductsService.name, UserService.name, CategoriesService.name];
    };

}


export default ViewProductEditComponent;
