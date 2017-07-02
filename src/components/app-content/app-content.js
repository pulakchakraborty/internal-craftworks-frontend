'use strict';

import angular from 'angular';

import AppHeader from './../app-header/app-header';
import AppFooter from './../app-footer/app-footer';
import AppSidebar from './../app-sidebar/app-sidebar';

import AppContentComponent from './app-content.component';


export default angular.module('AppView', [
        AppHeader.name,
        AppFooter.name,
        AppSidebar.name
    ])
    .component(AppContentComponent.name, new AppContentComponent);