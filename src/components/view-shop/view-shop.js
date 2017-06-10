'use strict';

import angular from 'angular';

import ViewShopComponent from './view-shop.component';


export default angular.module('ViewShop', [])
    .component(ViewShopComponent.name, new ViewShopComponent);