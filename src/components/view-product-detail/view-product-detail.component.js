
'use strict';

import template from './view-product-detail.template.html';
import ProductsService from './../../services/products/products.service';
import UserService from './../../services/user/user.service';

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
    constructor($state,ProductsService,UserService){
        this.$state = $state;
        this.ProductsService = ProductsService;
        this.UserService = UserService;
    }

    edit () {

        if (this.UserService.isAuthenticated()) {
            let _id = this.product['_id'];
            this.$state.go('app.productEdit',{ productId:_id});
        } else {
            this.$state.go('app.login',{});
        }

    };


    delete() {
        if (this.UserService.isAuthenticated()) {
            let _id = this.product['_id'];

            this.ProductsService.delete(_id).then(response => {
                this.$state.go('app.products',{});
            });
        } else {
            this.$state.go('app.login',{});
        }
    };


    getimage(){
        let imageURL = 'http://via.placeholder.com/550x550';

        return imageURL;
    }

    static get $inject(){
        return ['$state', ProductsService.name, UserService.name];
    }

}


export default ViewProductDetailComponent;
