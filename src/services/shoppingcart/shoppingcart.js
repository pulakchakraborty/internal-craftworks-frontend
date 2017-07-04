'use strict';

import angular from 'angular';

import ShoppingcartService from './shoppingcart.service';


export default angular.module('ShoppingcartServiceDefinition', [])
    .service(ShoppingcartService.name, ShoppingcartService)