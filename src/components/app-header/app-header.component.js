'use strict';

import UserService from './../../services/user/user.service';
import ProductsService from './../../services/products/products.service';

import template from './app-header.template.html';

import './app-header.style.css';

class AppHeaderComponent {
    constructor(){
        this.controller = AppHeaderComponentController;
        this.keyword = {};
        this.template = template;
        this.bindings = {
            menuId: '<'
        }
    }

    static get name() {
        return 'appHeader';
    }
}

class AppHeaderComponentController{
    constructor($state,UserService,$mdSidenav,$rootScope,ProductsService){
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.UserService = UserService;
        this.$mdSidenav = $mdSidenav;
        this.ProductsService = ProductsService;
    }

    $onInit () {
        this.menuOpened = false;

        this.onMenuClosed = this.$rootScope.$on('menuClosed', (event, args) => {
            this.menuOpened = false;
        });
    }

    $onDestroy() {
        this.onMenuClosed();
    }

    newProduct(){
        this.$state.go('productAdd',{});
    }

    openMenu($mdMenu, ev) {
        $mdMenu.open(ev);
    }

    isAuthenticated(){
        return this.UserService.isAuthenticated();
    }

    getCurrentUser(){
        let user = this.UserService.getCurrentUser();
        return user.username;
    }

    toggleLeft () {
        this.menuOpened = !this.menuOpened;
        this.$mdSidenav(this.menuId)
            .toggle();
    }

    goHome(){
        this.$state.go('home',{});
    }

    login(){
        this.$state.go('app.login',{});
    }

    logout(){
        this.UserService.logout();
        this.$state.go('home',{});
    }

    searchProduct(){
        if (!this.keyword) {
            this.ProductsService.searchKeywordSetter('All');
            this.ProductsService.categorySetter("");
            this.$state.go('app.productSearch',{ keyword: 'all' });
        }
        else {
            this.ProductsService.searchKeywordSetter(this.keyword);
            this.ProductsService.categorySetter("");
            this.$state.go('app.productSearch',{ keyword: this.keyword });
        }
    }

    myOffers(){
        let requestingUser = this.UserService.getCurrentUser();
        this.$state.go('app.product.productsSeller',{ sellerId: requestingUser['_id'] });
    }

    addProduct() {
        if (this.UserService.isAuthenticated()) {
            this.$state.go('app.product.productAdd',);
        } else {
            this.$state.go('app.login', {});
        }
    }



    static get $inject(){
        return ['$state', UserService.name, '$mdSidenav', '$rootScope', ProductsService.name];
    }

}

export default AppHeaderComponent;
