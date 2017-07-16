
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
    constructor($state,UserService,$mdToast){
        //this.user = {};
        this.$state = $state;
        this.UserService = UserService;
        this.$mdToast = $mdToast;
    }

    $onInit() {
        this.signup = {};
    }

    submit(){
       // let user = this.signup.username;
       // let password = this.signup.password;

        this.UserService.signup(this.signup).then(data => {
            if (data.code === 11000) {
                console.log("User signup NOT successful");
                this.$mdToast.show(
                    this.$mdToast.simple()
                        .toastClass('md-toast-error')
                        .textContent('Please chose a different username or email. An user with the chosen username or email already exists!')
                        .position('bottom right')
                        .hideDelay(5000)
                );
            }
            else {
                console.log("User signup successful");
                console.log(data);
                this.$state.go('home',{});
            }
        });
    }

    static get $inject(){
        return ['$state', UserService.name, '$mdToast'];
    }

}


export default ViewSignupComponent;
