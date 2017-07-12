/**
 * Created by barbaraprommegger on 26/06/2017.
 */

'use strict';

import angular from 'angular';

import ViewShoppingCartComponent from './view-shoppingcart.component';


export default angular.module('ViewShoppingCart', [])
    .component(ViewShoppingCartComponent.name, new ViewShoppingCartComponent);
