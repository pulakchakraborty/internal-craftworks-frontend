'use strict';

import angular from 'angular';

import ViewProductEditComponent from './view-product-edit.component';


export default angular.module('ViewProductEdit', [])
    .component(ViewProductEditComponent.name, new ViewProductEditComponent);
