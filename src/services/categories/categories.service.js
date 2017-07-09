'use strict';

export default class CategoriesService {

    static get $inject(){
        return ['$http', 'API_URL', 'UserService', '$state'];
    }

    constructor($http,API_URL,UserService,$state) {
        this.$http = $http;
        this.resourceUrl = `${ API_URL }/categories/`;
        this.extraUrl = 'parentCategories/';
        //this.searchUrl = 'search/';
        this.UserService = UserService;
        this.$state = $state;
        //this.Upload = Upload;

    }

    static get name(){
        return 'categoriesService';
    }

    list() {
        let url = `${ this.resourceUrl }${ this.extraUrl }`;
        return this.$http.get(url).then(responce => {

            //return responce.data;
            return new Promise((resolve, reject) => {
                resolve(responce.data);

            })

        });
    }

    /*search(keyword) {
        let url = `${ this.resourceUrl }${ this.searchUrl }${ keyword }`;
        return this.$http.post(url).then(responce => {

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
        return this.Upload.upload({
            url: url,
            data: product
        }).then(responce => {

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
    } */

    /*update(product) {
        let url = `${ this.resourceUrl }${ product['_id'] }`;
        return this.$http.put(url,product).then(responce => {

            return new Promise((resolve, reject) => {
                resolve(responce.data);
            });

        })
    }*/
    /*
    update(product) {
        let url = `${ this.resourceUrl }${ product['_id'] }`;
        return this.Upload.upload({
            url: url,
            data: product,
            method: 'POST'
        }).then(responce => {

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

    listShoppingCart () {
        let url = this.resourceUrl;
        return this.$http.get(url).then(responce => {

            return new Promise((resolve, reject) => {
                resolve(responce.data);

            });

        });
    }
    */
}
