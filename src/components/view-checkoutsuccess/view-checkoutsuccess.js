/**
 * Created by barbaraprommegger on 26/06/2017.
 */

'use strict';

import angular from 'angular';

import CheckOutSuccessComponent from './view-checkoutsuccess.component';


export default angular.module('ViewCheckOutSuccess', [])
    .component(CheckOutSuccessComponent.name, new CheckOutSuccessComponent);
