'use strict';

import angular from 'angular';

import CategoriesService from './categories.service';


export default angular.module('CategoriesServiceDefinition', [])
    .service(CategoriesService.name, CategoriesService)
