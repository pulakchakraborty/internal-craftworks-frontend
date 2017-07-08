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
                src: 'src/assets/img/Seller1.jpg'
            },
            {
                src: 'src/assets/img/Seller2.jpg'
            },
            {
                src: 'src/assets/img/Seller3.jpg'
            },
            {
                src: 'src/assets/img/Seller4.jpg'
            },
            {
                src: 'src/assets/img/Seller5.jpg'
            }
        ];
        this.slideshowCurrentIndex = 0;
        this.slideshowTemplateUrl = './item-template.html';

    }

}


export default ViewSlideshowSellerComponent;
