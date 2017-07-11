/**
 * Created by barbaraprommegger on 26/06/2017.
 */

'use strict';

import template from './view-AboutUs.template.html';
import UserService from './../../services/user/user.service';
import ProductsService from './../../services/products/products.service';
import './view-AboutUs.style.css';


class AboutUsComponent {
    constructor(){
        this.controller = AboutUsComponentController;
        this.template = template;
        this.bindings = {
            products: '<',
        }
    }

    static get name() {
        return 'viewAboutUs';
    }


}

class AboutUsComponentController{
    constructor($state,UserService,ProductsService){
        this.$state = $state;
        this.UserService = UserService;
        this.ProductsService = ProductsService;

    }

    static get $inject(){
        return ['$state', UserService.name, ProductsService.name];
    };
}

export default AboutUsComponent;
