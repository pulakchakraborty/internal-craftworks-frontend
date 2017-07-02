'use strict';

import angular from 'angular';

import ViewProductComponent from './view-product.component';


export default angular.module('ViewProduct', [])
    .component(ViewProductComponent.name, new ViewProductComponent);
