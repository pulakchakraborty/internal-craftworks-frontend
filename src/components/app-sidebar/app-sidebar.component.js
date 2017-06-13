
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
    constructor($rootScope,$mdSidenav,$scope){
        this.$rootScope = $rootScope;
        this.$mdSidenav = $mdSidenav;
        this.$scope = $scope;
    }

    $onInit() {
        let $self = this;
        this.$rootScope.$on('$locationChangeSuccess', function(event, url, oldUrl, state, oldState){
            $self.$rootScope.$broadcast('menuClosed');
            $self.$mdSidenav($self.menuId).close();
        })
    }

    static get $inject(){
        return ['$rootScope', '$mdSidenav', '$scope'];
    }
}


export default AppSidebarComponent;