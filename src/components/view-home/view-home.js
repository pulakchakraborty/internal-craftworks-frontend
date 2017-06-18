'use strict';

import angular from 'angular';

import ViewHomeComponent from './view-home.component';
import ViewSlideshow from './../view-slideshow/view-slideshow';
import ViewSlideshowSeller from './../view-slideshow-seller/view-slideshow-seller';


export default angular.module('ViewHome', [
    ViewSlideshow.name,
    ViewSlideshowSeller.name
    ])
    .component(ViewHomeComponent.name, new ViewHomeComponent);
