'use strict';

import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import ngCookies from 'angular-cookies';

import angularMaterial from 'angular-material';
import 'angular-material/angular-material.css';

import ngMdIcons from 'angular-material-icons';
import ngMessages from 'angular-messages';

import UserService from './services/user/user';
import ProductsService from './services/products/products';
import ShoppingcartService from './services/shoppingcart/shoppingcart';
import CategoriesService from './services/categories/categories';
import OrdersService from './services/orders/orders';

import Routes from './config/routes';
import Middlewares from './config/middlewares';

import jkAngularCarousel from 'angular-jk-carousel/dist/jk-carousel';
import 'angular-jk-carousel/dist/jk-carousel.css';

import ngFileUpload from 'ng-file-upload'

import AppContent from './components/app-content/app-content';
import ViewHome from './components/view-home/view-home';
import ViewOffers from './components/view-offers/view-offers';
import ViewProductCreate from './components/view-product-create/view-product-create';
import ViewProductEdit from './components/view-product-edit/view-product-edit';
import ViewProduct from './components/view-product/view-product';
import ViewProductDetail from './components/view-product-detail/view-product-detail';
import ViewLogin from './components/view-login/view-login';
import ViewSignup from './components/view-signup/view-signup';
import ViewProductsSeller from './components/view-products-seller/view-products-seller';
import ChooseFile from './directives/choose-file/choose-file';
import ViewShoppingCart from './components/view-shoppingcart/view-shoppingcart';
import ViewCheckOut from './components/view-checkout/view-checkout';
import ViewCheckOutSuccess from './components/view-checkoutsuccess/view-checkoutsuccess';
import ViewAboutUs from './components/view-AboutUs/view-AboutUs';
import SearchProducts from './components/search-products/search-products';

let app = angular.module('app', [
    uiRouter,
    angularMaterial,
    ngMdIcons,
    ngMessages,
    jkAngularCarousel,
    ngCookies,
    UserService.name,
    ProductsService.name,
    ShoppingcartService.name,
    CategoriesService.name,
    OrdersService.name,
    AppContent.name,
    ViewLogin.name,
    ViewSignup.name,
    ViewHome.name,
    ViewOffers.name,
    ViewProductEdit.name,
    ViewProductCreate.name,
    ViewProduct.name,
    ViewProductsSeller.name,
    ViewProductDetail.name,
    ViewShoppingCart.name,
    ViewCheckOut.name,
    ViewCheckOutSuccess.name,
    ChooseFile.name,
    ViewAboutUs.name,
    ngFileUpload,
    SearchProducts.name
]);

app.constant('API_URL', 'http://localhost:3000/api');
app.config(Routes);
app.config(Middlewares);

app.config(['$mdThemingProvider',function($mdThemingProvider){
    $mdThemingProvider.theme('default')
        .primaryPalette('light-green')

}]);

angular.element(document).ready(function() {
    return angular.bootstrap(document.body, [app.name], {
        strictDi: true
    });
});

requireAll(require.context('./assets/img', true, /\.jpg|png$/));
function requireAll(r) {
  r.keys().forEach(r);
}


export default app;
