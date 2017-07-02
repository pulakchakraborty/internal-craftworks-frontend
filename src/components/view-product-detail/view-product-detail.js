'use strict';

import angular from 'angular';

import ViewProductDetailComponent from './view-product-detail.component';


export default angular.module('ViewProductDetail', [])
    .component(ViewProductDetailComponent.name, new ViewProductDetailComponent);
