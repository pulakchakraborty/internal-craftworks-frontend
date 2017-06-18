'use strict';

import template from './view-slideshow-seller.template.html';
import './view-slideshow-seller.style.css';

class ViewSlideshowSellerComponent {
    constructor(){
        this.controller = ViewSlideshowSellerComponentController;
        this.template = template;

    }

    static get name() {
        return 'viewSlideshowSeller';
    }


}

class ViewSlideshowSellerComponentController{
    constructor(){
        this.arrayData = [
            {
                src: 'src/assets/img/Category_HomeDecor.jpeg'
            },
            {
                src: 'src/assets/img/Category_Art.jpg'
            },
            {
                src: 'src/assets/img/Category_Clothes2.jpeg'
            },
            {
                src: 'src/assets/img/Category_Jewellery.jpg'
            },
            {
                src: 'src/assets/img/Category_Clothes.jpeg'
            }
        ];
        this.slideshowCurrentIndex = 0;
        this.slideshowTemplateUrl = './item-template.html';

    }

}


export default ViewSlideshowSellerComponent;
