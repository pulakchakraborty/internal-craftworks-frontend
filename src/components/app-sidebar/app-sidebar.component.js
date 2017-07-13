
'use strict';

import template from './app-sidebar.template.html';
import './app-sidebar.style.css';

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
    constructor($state, $rootScope,$mdSidenav,$scope){
        this.$rootScope = $rootScope;
        this.$mdSidenav = $mdSidenav;
        this.$scope = $scope;
        this.$state = $state;
    }

    $onInit() {
        let $self = this;
        this.$rootScope.$on('$locationChangeSuccess', function(event, url, oldUrl, state, oldState){
            $self.$rootScope.$broadcast('menuClosed');
            $self.$mdSidenav($self.menuId).close();
        })
    }

    openJewellery(){
        if (!this.keyword) {
            this.$state.go('app.productSearch',{ keyword: 'all' });
            $ctrl.filter.category = "Jewellery";

        }
        else {
            this.$state.go('app.productSearch',{ keyword: this.keyword });
        }
    }

    static get $inject(){
        return ['$state', '$rootScope', '$mdSidenav', '$scope'];
    }
}


export default AppSidebarComponent;