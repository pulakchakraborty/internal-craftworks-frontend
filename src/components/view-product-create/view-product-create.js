'use strict';

import angular from 'angular';

import ViewProductCreateComponent from './view-product-create.component';


export default angular.module('ViewProductCreate', [])
    .component(ViewProductCreateComponent.name, new ViewProductCreateComponent);