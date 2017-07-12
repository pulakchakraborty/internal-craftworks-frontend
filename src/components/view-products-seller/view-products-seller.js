'use strict';

import angular from 'angular';

import ViewProductsSellerComponent from './view-products-seller.component';


export default angular.module('ViewProductsSeller', [])
    .component(ViewProductsSellerComponent.name, new ViewProductsSellerComponent);
