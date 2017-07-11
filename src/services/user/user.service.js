'use strict';


export default class UserService {

    static get $inject(){
        return ['$http', '$window','API_URL'];
    }

    constructor($http,$window,API_URL) {
        this.$http = $http;
        this.$window = $window;
        this.API_URL = API_URL;
    }

    static get name(){
        return 'UserService';
    }

    signup(signup) {
        return this.$http.post(`${ this.API_URL }/user/signup`, signup);
    }

    login(user, pass) {
        return this.$http.post(`${ this.API_URL }/user/login`, {
            username: user,
            password: pass
        });
    }

    logout(){
        this.$window.localStorage.removeItem('jwtToken');
    }

    getCurrentUser() {
        let token = this.$window.localStorage['jwtToken'];
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(this.$window.atob(base64)).user;
    }

    getCurrentUserAddress() {
        let userId= "5706dcb2e69695f3096743af";
        let url = `${ this.API_URL}/user/` + userId;
        /*
        return this.$http.get(url).then(responce => {/*
            return new Promise((resolve, reject) => {
                resolve(responce.data);
            });

        })
        */
        return "TODO";
    }


    isAuthenticated() {
        return !!this.$window.localStorage['jwtToken'];
    }


}
