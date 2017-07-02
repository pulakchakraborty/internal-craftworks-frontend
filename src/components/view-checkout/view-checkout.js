/**
 * Created by barbaraprommegger on 26/06/2017.
 */

'use strict';

import angular from 'angular';

import CheckOutComponent from './view-checkout.component';


export default angular.module('ViewCheckOut', [])
    .component(CheckOutComponent.name, new CheckOutComponent);
