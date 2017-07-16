'use strict';

export default class ProductsService {

    static get $inject(){
        return ['$http', 'API_URL', 'UserService', '$state', 'Upload'];
    }

    constructor($http,API_URL,UserService,$state,Upload) {
        this.$http = $http;
        this.resourceUrl = `${ API_URL }/products/`;
        this.extraUrl = 'seller/';
        this.searchUrl = 'search/';
        this.UserService = UserService;
        this.$state = $state;
        this.Upload = Upload;
        this.passCategory = "";
        this.passKeyword = "";
    }

    static get name(){
        return 'productsService';
    }

    // categorySetter function to set category from either side navigation bar or header
    categorySetter(sendCategory) {
        this.passCategory = sendCategory;
        //this.passCategory = category;
        console.log("debug msg: ", this.passCategory);
        return true;
    }

    // categoryGetter function used as a service to fetch/refresh category data into search and filter page
    categoryGetter() {
        console.log(this.passCategory);
        if (this.passCategory !== "") {
            console.log("inside getter if: ", this.passCategory);
            return this.passCategory;
        }
        else {
            return "";
        }

    }

    searchKeywordSetter(searchKeyword) {
        this.passKeyword = searchKeyword;
        console.log("debug msg: ", this.passKeyword);
        return true;
    }

    searchKeywordGetter() {
        return this.passKeyword;
    }

    list() {
        let url = this.resourceUrl;
        return this.$http.get(url).then(responce => {

            return new Promise((resolve, reject) => {
                resolve(responce.data);

            });

        });
    }

    search(keyword) {
        let url = `${ this.resourceUrl }${ this.searchUrl }${ keyword }`;
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

    getSpecificProducts(ids) {
        let url = `${ this.resourceUrl }getspecificproducts`;
        return this.$http.post(url, ids).then(responce => {
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
    }

    /*update(product) {
        let url = `${ this.resourceUrl }${ product['_id'] }`;
        return this.$http.put(url,product).then(responce => {

            return new Promise((resolve, reject) => {
                resolve(responce.data);
            });

        })
    }*/

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

}
