'use strict';

import angular from 'angular';

import ViewHomeComponent from './view-home.component';
import ViewSlideshow from './../view-slideshow/view-slideshow';


export default angular.module('ViewHome', [
    ViewSlideshow.name
    ])
    .component(ViewHomeComponent.name, new ViewHomeComponent);
