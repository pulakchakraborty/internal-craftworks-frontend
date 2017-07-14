'use strict';

import template from './search-products.template.html';
import UserService from './../../services/user/user.service';
import ProductsService from './../../services/products/products.service';
import ShoppingcartService from './../../services/shoppingcart/shoppingcart.service';
import CategoriesService from './../../services/categories/categories.service';
import './search-products.style.css';


class SearchProductsComponent {
    constructor(){
        this.controller = SearchProductsComponentController;
        this.template = template;
        this.bindings = {
            results: '<',
        }
    }

    static get name() {
        return 'searchProducts';
    }


}

class SearchProductsComponentController{
    constructor($state,UserService,ProductsService,ShoppingcartService,CategoriesService){
        this.$state = $state;
        this.UserService = UserService;
        this.ProductsService = ProductsService;
        this.ShoppingcartService = ShoppingcartService;
        this.shoppingCart = [];
        this.CategoriesService = CategoriesService;
    }

    $onInit() {
        // initialize the filter variable
        this.filter = {};
        this.filter.category = this.ProductsService.categoryGetter();
        if (this.filter.category !== "") {
            this.filter.catText = this.filter.category + " >";
        }
        else {
            this.filter.catText = "All >";
        }
        this.filter.orderBy = false;
        this.categories = {};
        this.subcategories = {};

        //use category service
        this.CategoriesService.list().then(data => {
            this.categories = JSON.parse(JSON.stringify(data));
            console.log(this.categories);

            //this.$state.go('app.product.productsSeller',{sellerId:seller_Id});
        });
        this.orderByPrice = function (item) {
            return parseFloat(item._source.price);
        };
    }

    onCategoryChange() {
        console.log(this.filter.category);
        this.CategoriesService.getSubcategories(this.filter.category).then(data => {
                this.subcategories = JSON.parse(JSON.stringify(data));
                this.filter.subcatText = "";
                this.filter.catText = this.filter.category + " >";
                this.filter.subcategory = false;
                console.log(this.subcategories);
        });
    }

    onSubCategoryChange() {
        this.filter.subcatText =  this.filter.subcategory + " >";
    }

    goToProductDetails(product_id) {
        this.$state.go('app.productDetail',{ productId: product_id });
    }
    /*details (product) {
        let _id = product['_id'];
        this.$state.go('product',{ productId:_id});
    };*/

    /*addtoShoppingCart(product) {
        let _id = product['_id'];
        this.ShoppingcartService.addItem(product,1);
    }*/
/*
    orderByPrice (item) {
        //console.log(this.filter.sortOrder);
        return parseFloat(item._source.price);

    };
*/
    filterPrice (price) {
        // Do some tests
        //console.log(price);
        if (!price) {
            return function (result) {
                //console.log(result);
                return true;
            }
        }
        else {
            return function (result) {
                //console.log(result);
                return (result._source.price < price);
            }
        }
    };

    filterColor (color) {
        // Do some tests
        //console.log(color);
        if (!color) {
            return function (result) {
                //console.log(result);
                return true;
            }
        }
        else {
            if ((color['isYellow'] === true)
                || (color['isOrange'] === true)
                || (color['isRed'] === true)
                || (color['isBrown'] === true)
                || (color['isGreen'] === true)
                || (color['isBlue'] === true)
                || (color['isViolette'] === true)
                || (color['isWhite'] === true)
                || (color['isBlack'] === true)
                || (color['isGrey'] === true)){
                return function (result) {
                    if (result._source.color['isYellow'] === color['isYellow']) {
                        return true;
                    }
                    else if (result._source.color['isOrange'] === color['isOrange']) {
                        return true;
                    }
                    else if (result._source.color['isRed'] === color['isRed']) {
                        return true;
                    }
                    else if (result._source.color['isBrown'] === color['isBrown']) {
                        return true;
                    }
                    else if (result._source.color['isGreen'] === color['isGreen']) {
                        return true;
                    }
                    else if (result._source.color['isBlue'] === color['isBlue']) {
                        return true;
                    }
                    else if (result._source.color['isViolette'] === color['isViolette']) {
                        return true;
                    }
                    /*else if (result._source.color['isWhite'] === color['isWhite']) {
                        return true;
                    }
                    else if (result._source.color['isBlack'] === color['isBlack']) {
                        return true;
                    }
                    else if (result._source.color['isGrey'] === color['isGrey']) {
                        return true;
                    }
                    else {
                        return false;
                    }*/
                }
            }

            /*if (color['isYellow'] === true) {
                return function (result) {
                    console.log(result);
                    return (result._source.color['isYellow'] === color['isYellow']);
                }
            }
            if (color['isOrange'] === true) {
                return function (result) {
                    console.log(result);
                    return (result._source.color['isOrange'] === color['isOrange']);
                }
            }
            if (color['isRed'] === true) {
                return function (result) {
                    console.log(result);
                    return (result._source.color['isRed'] === color['isRed']);
                }
            }
            if (color['isBrown'] === true) {
                return function (result) {
                    console.log(result);
                    return (result._source.color['isBrown'] === color['isBrown']);
                }
            }
            if (color['isGreen'] === true) {
                return function (result) {
                    console.log(result);
                    return (result._source.color['isGreen'] === color['isGreen']);
                }
            }
            if (color['isBlue'] === true) {
                return function (result) {
                    console.log(result);
                    return (result._source.color['isBlue'] === color['isBlue']);
                }
            }
            if (color['isViolette'] === true) {
                return function (result) {
                    console.log(result);
                    return (result._source.color['isViolette'] === color['isViolette']);
                }
            }
            if (color['isWhite'] === true) {
                return function (result) {
                    console.log(result);
                    return (result._source.color['isWhite'] === color['isWhite']);
                }
            }
            if (color['isBlack'] === true) {
                return function (result) {
                    console.log(result);
                    return (result._source.color['isBlack'] === color['isBlack']);
                }
            }
            if (color['isGrey'] === true) {
                return function (result) {
                    console.log(result);
                    return (result._source.color['isGrey'] === color['isGrey']);
                }
            }*/
        }
    };

    static get $inject(){
        return ['$state', UserService.name, ProductsService.name, ShoppingcartService.name, CategoriesService.name];
    }


}

export default SearchProductsComponent;
