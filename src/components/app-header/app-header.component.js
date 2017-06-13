
'use strict';

import UserService from './../../services/user/user.service';

import template from './app-header.template.html';

import './app-header.style.css';

class AppHeaderComponent {
    constructor(){
        this.controller = AppHeaderComponentController;
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
    constructor($state,UserService,$mdSidenav,$rootScope){
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.UserService = UserService;
        this.$mdSidenav = $mdSidenav;
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

    static get $inject(){
        return ['$state', UserService.name, '$mdSidenav', '$rootScope'];
    }

}


export default AppHeaderComponent;