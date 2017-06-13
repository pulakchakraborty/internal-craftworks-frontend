
'use strict';

import template from './view-home.template.html';
import './view-home.style.css';

class ViewHomeComponent {
    constructor(){
        this.controller = ViewHomeComponentController;
        this.template = template;

    }

    static get name() {
        return 'viewHome';
    }


}

class ViewHomeComponentController{
    constructor($state){
        this.$state = $state;
    }

    static get $inject(){
        return ['$state'];
    }

}


export default ViewHomeComponent;