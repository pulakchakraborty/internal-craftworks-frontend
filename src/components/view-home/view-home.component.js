
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
        this.$state.go('app.productsSeller',{ sellerId: requestingUser['_id'] });
    }

    static get $inject(){
        return ['$state', UserService.name];
    }

}


export default ViewHomeComponent;