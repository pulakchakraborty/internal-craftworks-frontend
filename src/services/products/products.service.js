'use strict';

export default class ProductsService {

    static get $inject(){
        return ['$http', 'API_URL', 'UserService', '$state'];
    }

    constructor($http,API_URL,UserService,$state) {
        this.$http = $http;
        this.resourceUrl = `${ API_URL }/products/`;
        this.extraUrl = 'seller/';
        this.UserService = UserService;
        this.$state = $state;

    }

    static get name(){
        return 'productsService';
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


    create(product) {
        let url = this.resourceUrl;
        return this.$http.post(url,product).then(responce => {

            return new Promise((resolve, reject) => {
                resolve(responce.data);
            });

        })
    }

    delete(id) {
        let url = `${ this.resourceUrl }${ id }`;
        return this.$http.delete(url).then(responce => {

            return new Promise((resolve, reject) => {
                resolve(responce.status);
            });

        })
    }

    update(product) {
        let url = `${ this.resourceUrl }${ product['_id'] }`;
        return this.$http.put(url,product).then(responce => {

            return new Promise((resolve, reject) => {
                resolve(responce.data);
            });

        })
    }

    listProducts(id) {
        // make sure that user is not able to see product listing of another user
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
