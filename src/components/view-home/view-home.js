'use strict';

import angular from 'angular';

import ViewHomeComponent from './view-home.component';


export default angular.module('ViewHome', [])
    .component(ViewHomeComponent.name, new ViewHomeComponent);