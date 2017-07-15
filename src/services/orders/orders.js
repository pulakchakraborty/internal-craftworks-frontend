'use strict';

import angular from 'angular';

import OrdersService from './orders.service';


export default angular.module('OrdersServiceDefinition', [])
    .service(OrdersService.name, OrdersService)