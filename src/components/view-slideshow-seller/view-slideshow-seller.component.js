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
                src: 'https://www.travelexcellence.com/images/movil/La_Paz_Waterfall.jpg'
            },
            {
                src: 'http://www.parasholidays.in/blog/wp-content/uploads/2014/05/holiday-tour-packages-for-usa.jpg'
            },
            {
                src: 'http://clickker.in/wp-content/uploads/2016/03/new-zealand-fy-8-1-Copy.jpg'
            },
            {
                src: 'http://images.kuoni.co.uk/73/indonesia-34834203-1451484722-ImageGalleryLightbox.jpg'
            }
        ];
        this.slideshowCurrentIndex = 0;
        this.slideshowTemplateUrl = './item-template.html';

    }

}


export default ViewSlideshowSellerComponent;
