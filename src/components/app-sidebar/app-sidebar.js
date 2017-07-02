'use strict';

import angular from 'angular';

import AppSidebarComponent from './app-sidebar.component';


export default angular.module('AppSidebar', [])
    .component(AppSidebarComponent.name, new AppSidebarComponent);