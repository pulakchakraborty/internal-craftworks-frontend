
'use strict';

import template from './app-sidebar.template.html';
import './app-sidebar.style.css';
import ProductsService from './../../services/products/products.service';

class AppSidebarComponent {
    constructor(){
        this.controller = AppSidebarComponentController;
        this.template = template;
        this.bindings = {
            menuId: '<'
        }
    }

    static get name() {
        return 'appSidebar';
    }


}

class AppSidebarComponentController{
    constructor($state, $rootScope,$mdSidenav,$scope,ProductsService){
        this.$rootScope = $rootScope;
        this.$mdSidenav = $mdSidenav;
        this.$scope = $scope;
        this.$state = $state;
        this.ProductsService = ProductsService;
    }

    $onInit() {
        let $self = this;
        this.sidebarCategory = {};
        this.$rootScope.$on('$locationChangeSuccess', function(event, url, oldUrl, state, oldState){
            $self.$rootScope.$broadcast('menuClosed');
            $self.$mdSidenav($self.menuId).close();
        })
    }

    // function gets called when user clicks on a particular category from side navigation
    filterOnCategory(sendCategory){
        this.ProductsService.categorySetter(sendCategory);

        /* force load the search and filter page; not a good design pattern, but for the moment
            would keep it here. This is done so that navigating to search result for a particular
            category is possible from side-navigation bar
        */
        this.$state.go('app.productSearch',{ keyword: "all" }, {reload: true});

    }

    static get $inject(){
        return ['$state', '$rootScope', '$mdSidenav', '$scope', ProductsService.name];
    }
}


export default AppSidebarComponent;
