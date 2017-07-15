
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

    //categories get instanciated
    $onInit() {
        this.categories = {};
        this.subcategories = {};
        //use category service
        this.CategoriesService.list().then(data => {
            this.categories = JSON.parse(JSON.stringify(data));
        });

    };

    //User gets back to My Offers
    cancel() {
        let requestingUser = this.UserService.getCurrentUser();
        this.$state.go('app.productsSeller',{ sellerId: requestingUser['_id'] });
    };

    //Save new Offer into Database
    save() {
        console.log(this.product);
        let user = this.UserService.getCurrentUser();
        let seller_Id = user['_id'];
        this.product['seller'] = user['_id'];
        this.ProductsService.create(this.product).then(data => {
            let _id = data['_id'];
            this.$state.go('app.productsSeller',{sellerId:seller_Id});
        });
    };

    newProduct(){
        this.$state.go('productAdd',{});
    };

    //change subcategories depending on chosen categories
    onCategoryChange() {
        this.CategoriesService.getSubcategories(this.product.category).then(data => {
            this.subcategories = JSON.parse(JSON.stringify(data));
        });
    };

    static get $inject(){
        return ['$state', ProductsService.name, UserService.name, CategoriesService.name];
    };
}

export default ViewProductCreateComponent;
