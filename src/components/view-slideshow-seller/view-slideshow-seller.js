/**
 * Created by pulakchakraborty on 6/17/17.
 */
'use strict';

import angular from 'angular';

import ViewSlideshowSellerComponent from './view-slideshow-seller.component';


export default angular.module('ViewSlideshowSeller', [])
    .component(ViewSlideshowSellerComponent.name, new ViewSlideshowSellerComponent);
