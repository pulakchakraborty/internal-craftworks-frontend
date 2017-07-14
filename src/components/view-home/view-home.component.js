
'use strict';

import template from './view-home.template.html';
import UserService from './../../services/user/user.service';
import './view-home.style.css';

class ViewHomeComponent {
    constructor(){
        this.controller = ViewHomeComponentController;
        this.template = template;

    }

    static get name() {
        return 'viewHome';
    }


}

class ViewHomeComponentController{
    constructor($state,UserService){
        this.$state = $state;
        this.UserService = UserService;
    }

    isAuthenticated(){
        return this.UserService.isAuthenticated();
    }

    getCurrentUser(){
        let user = this.UserService.getCurrentUser();
        return user.username;
    }

    logout(){
        this.UserService.logout();
        this.$state.go('home',{});
    }
    myOffers(){
        let requestingUser = this.UserService.getCurrentUser();
        this.$state.go('app.product.productsSeller',{ sellerId: requestingUser['_id'] });
    }

    offers(){
        this.$state.go('app.offers',{});
    }

    addProduct() {
        if (this.UserService.isAuthenticated()) {
            this.$state.go('app.product.productAdd',);
        } else {
            this.$state.go('app.login', {});
        }
    }

    goHome(){
        this.$state.go('home',{});
    }

    gotoSearch() {
        this.$state.go('app.productSearch',{ keyword: "all" }, {reload: true});
    }

    static get $inject(){
        return ['$state', UserService.name];
    }

}


export default ViewHomeComponent;
