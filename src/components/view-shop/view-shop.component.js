
'use strict';

import template from './view-shop.template.html';


class ViewShopComponent {
    constructor(){
        this.controller = ViewShopComponentController;
        this.template = template;
        this.bindings = {
            category: '<',
        }
    }

    static get name() {
        return 'viewShop';
    }
}

class ViewShopComponentController{
    constructor($state, $stateParams){
        this.$state = $state;
        this.$stateParams = $stateParams;
    }

    static get $inject(){
        return ['$state', '$stateParams'];
    }

}

export default ViewShopComponent;