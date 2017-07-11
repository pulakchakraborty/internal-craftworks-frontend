/**
 * Created by barbaraprommegger on 26/06/2017.
 */

'use strict';

import angular from 'angular';

import AboutUsComponent from './view-AboutUs.component';


export default angular.module('AboutUs', [])
    .component(AboutUsComponent.name, new AboutUsComponent);
