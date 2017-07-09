'use strict';

import template from './view-slideshow.template.html';
import './view-slideshow.style.css';
//import templateUrl from './item-template.html';

class ViewSlideshowComponent {
    constructor(){
        this.controller = ViewSlideshowComponentController;
        this.template = template;

    }

    static get name() {
        return 'viewSlideshow';
    }


}

class ViewSlideshowComponentController{
    constructor(){
        this.arrayData = [
            {
                src: 'src/assets/img/Category_HomeDecor.jpeg'
            },
            {
                src: 'src/assets/img/Category_Art2.jpeg'
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


export default ViewSlideshowComponent;
