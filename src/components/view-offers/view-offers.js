'use strict';

import angular from 'angular';

import ViewOffersComponent from './view-offers.component';


export default angular.module('ViewOffers', [])
    .component(ViewOffersComponent.name, new ViewOffersComponent);