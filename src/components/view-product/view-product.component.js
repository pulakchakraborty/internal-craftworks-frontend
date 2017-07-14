
'use strict';

import template from './view-product.template.html';
import ProductsService from './../../services/products/products.service';
import UserService from './../../services/user/user.service';

class ViewProductComponent {
    constructor(){
        this.controller = ViewProductComponentController;
        this.template = template;
        this.bindings = {
            product: '<',
        }

    }

    static get name() {
        return 'viewProduct';
    }


}

class ViewProductComponentController{
    constructor($state,ProductsService,UserService){
        this.$state = $state;
        this.ProductsService = ProductsService;
        this.UserService = UserService;
    }

    $onInit() {
        this.userFromApi = {};
        this.UserService.getCurrentUserInfo(this.UserService.getCurrentUser()._id).then(data => {
            this.userFromApi = JSON.parse(JSON.stringify(data));
            console.log(this.userFromApi);
        });
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

    myOffers(){
        let requestingUser = this.UserService.getCurrentUser();
        this.$state.go('app.product.productsSeller',{ sellerId: requestingUser['_id'] });
    }

    static get $inject(){
        return ['$state', ProductsService.name, UserService.name];
    }

}


export default ViewProductComponent;
