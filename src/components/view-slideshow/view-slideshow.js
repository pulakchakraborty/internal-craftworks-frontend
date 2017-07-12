/**
 * Created by pulakchakraborty on 6/17/17.
 */
'use strict';

import angular from 'angular';

import ViewSlideshowComponent from './view-slideshow.component';


export default angular.module('ViewSlideshow', [])
    .component(ViewSlideshowComponent.name, new ViewSlideshowComponent);
