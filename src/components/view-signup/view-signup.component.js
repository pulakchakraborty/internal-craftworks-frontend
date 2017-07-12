
'use strict';

import UserService from './../../services/user/user.service';

import template from './view-signup.template.html';
import './view-signup.style.css';

class ViewSignupComponent {
    constructor(){
        this.controller = ViewSignupComponentController;
        this.template = template;

    }

    static get name() {
        return 'viewSignup';
    }


}

class ViewSignupComponentController{
    constructor($state,UserService){
        //this.user = {};
        this.$state = $state;
        this.UserService = UserService;
    }

    $onInit() {
        this.signup = {};
    }

    submit(){
       // let user = this.signup.username;
       // let password = this.signup.password;

        this.UserService.signup(this.signup).then(data => {
            console.log("inside signup component submit block");
            console.log(data);
            this.$state.go('home',{});
        });
    }

    static get $inject(){
        return ['$state', UserService.name];
    }

}


export default ViewSignupComponent;
