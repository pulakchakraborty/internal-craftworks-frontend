'use strict';

import angular from 'angular';

import SearchProductsComponent from './search-products.component';


export default angular.module('SearchProducts', [])
    .component(SearchProductsComponent.name, new SearchProductsComponent);
