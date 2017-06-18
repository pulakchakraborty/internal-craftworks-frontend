
'use strict';

import template from './view-product-edit.template.html';

import ProductsService from './../../services/products/products.service';
import './view-product-edit.style.css';

class ViewProductEditComponent {
    constructor(){
        this.controller = ViewProductEditComponentController;
        this.template = template;
        this.bindings = {
            product: '<',
        }
    }

    static get name() {
        return 'viewProductEdit';
    }
}

class ViewProductEditComponentController{
    constructor($state, ProductsService){
        this.model = {};
        this.$state = $state;
        this.ProductsService = ProductsService;
    }

    $onInit() {
        //Clone the Product Data
        this.model = JSON.parse(JSON.stringify(this.product))
    }

    cancel() {
        this.model = JSON.parse(JSON.stringify(this.product));
        this.$state.go('app.offers',{});
    };

    save() {
        let _id = this.product['_id'];

        this.ProductsService.update(this.model).then(data => {
            this.product = JSON.parse(JSON.stringify(data));

            this.$state.go('app.productDetail',{ productId:_id});
        });

    };

    delete() {
        let _id = this.product['_id'];

        this.ProductsService.delete(_id).then(response => {
            this.$state.go('app.offers',{});
        });
    };

    static get $inject(){
        return ['$state', ProductsService.name];
    }

}


export default ViewProductEditComponent;
