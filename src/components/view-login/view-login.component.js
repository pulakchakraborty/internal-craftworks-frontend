
'use strict';

import UserService from './../../services/user/user.service';

import template from './view-login.template.html';
import './view-login.style.css';

class ViewLoginComponent {
    constructor(){
        this.controller = ViewLoginComponentController;
        this.template = template;

    }

    static get name() {
        return 'viewLogin';
    }


}

class ViewLoginComponentController{
    constructor($state,UserService,$mdToast){
        this.$state = $state;
        this.UserService = UserService;
        this.$mdToast = $mdToast;
    }

    $onInit() {
        this.login = {};
        this.buttonClicked = false;
    }

    submit(){
        this.buttonClicked = true;
        let user = this.login.username;
        let password = this.login.password;
        this.UserService.login(user,password).then(()=> {
            let seller = this.UserService.getCurrentUser();
            let seller_Id = seller['_id'];
            this.$state.go('app.product.productsSeller', {sellerId: seller_Id});
        }, responce => {
            console.log(responce);
            this.buttonClicked = false;
            this.$mdToast.show(
                this.$mdToast.simple()
                    .toastClass('md-toast-error')
                    .textContent('Your username and password do not match')
                    .position('bottom right')
                    .hideDelay(5000)
            );
        });
    }

    static get $inject(){
        return ['$state', UserService.name, '$mdToast'];
    }

}


export default ViewLoginComponent;
