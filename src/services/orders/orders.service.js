'use strict';

export default class OrdersService {

    static get $inject(){
        return ['$http', 'API_URL', 'UserService', '$state', 'Upload'];
    }

    constructor($http,API_URL,UserService,$state,Upload) {
        this.$http = $http;
        this.resourceUrl = `${ API_URL }/checkout/`;
        this.extraUrl = 'seller/';
        this.searchUrl = 'search/';
        this.UserService = UserService;
        this.$state = $state;
        this.Upload = Upload;

    }

    static get name(){
        return 'ordersService';
    }

    list() {
        let url = this.resourceUrl;
        return this.$http.get(url).then(responce => {

            return new Promise((resolve, reject) => {
                resolve(responce.data);

            });

        });
    }

    get(id) {
        let url = `${ this.resourceUrl }${ id }`;
        return this.$http.get(url).then(responce => {

            return new Promise((resolve, reject) => {
                resolve(responce.data);
            });

        })
    }

    create(order) {
        let url = this.resourceUrl;
        return this.$http.post(url, order).then(responce => {

            return new Promise((resolve, reject) => {
                resolve(responce.data);
            });
        })
    }

    listOrders(id) {
        // make sure that user is not able to see orders listing of another user
        let requestingUser = this.UserService.getCurrentUser();
        if (requestingUser['_id'] === id) {
            let url = `${ this.resourceUrl }${ this.extraUrl }${ id }`;
            return this.$http.get(url).then(responce => {

                return new Promise((resolve, reject) => {
                    resolve(responce.data);

                });
            });
        } else {
            this.$state.go('home',{});
        }
    }

}
