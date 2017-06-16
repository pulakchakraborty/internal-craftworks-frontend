'use strict';

import angular from 'angular';

import ProductsService from './products.service';


export default angular.module('ProductsServiceDefinition', [])
    .service(ProductsService.name, ProductsService)