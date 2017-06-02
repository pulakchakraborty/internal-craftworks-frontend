'use strict';

import angular from 'angular';

import ViewSignupComponent from './view-signup.component';


export default angular.module('ViewSignup', [])
    .component(ViewSignupComponent.name, new ViewSignupComponent);
