'use strict';

import AppContentComponent from './../components/app-content/app-content.component';
import HomeComponent from './../components/view-home/view-home.component';
import OffersComponent from './../components/view-offers/view-offers.component';
import ProductCreateComponent from './../components/view-product-create/view-product-create.component';
import ProductEditComponent from './../components/view-product-edit/view-product-edit.component';
import ProductComponent from './../components/view-product/view-product.component';
import LoginComponent from './../components/view-login/view-login.component';
import SignupComponent from './../components/view-signup/view-signup.component';
import ShopComponent from './../components/view-shop/view-shop.component';
import ProductsSellerComponent from './../components/view-products-seller/view-products-seller.component';
import ProductDetailComponent from './../components/view-product-detail/view-product-detail.component';
import ShoppingCartComponent from './../components/view-shoppingcart/view-shoppingcart.component';

import ProductsService from './../services/products/products.service';

resolveProduct.$inject = ['$stateParams', ProductsService.name];
function resolveProduct($stateParams,productsService){
    return productsService.get($stateParams.productId);
}

resolveProducts.$inject = [ProductsService.name];
function resolveProducts(productsService){
    return productsService.list();
}

resolveProductsSeller.$inject = ['$stateParams', ProductsService.name];
function resolveProductsSeller($stateParams, productsService){
    return productsService.listProducts($stateParams.sellerId);
}

resolveShoppingCart.$inject = [ProductsService.name];
function resolveShoppingCart(productsService){
    return productsService.list();
}

config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
export default function config ($stateProvider, $urlRouterProvider, $locationProvider){

    // For any unmatched url, redirect to /home
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('home', {
            url: '/',
            component: HomeComponent.name
        })
        .state('app', {
            abstract: true,
            component: AppContentComponent.name,
            url: '/app'
        })
        .state('app.shop', {
            url: '/shop/:category',
            component: ShopComponent.name
        })
        .state('app.product', {
            url: '/products',
            abstract: true,
            component: ProductComponent.name
        })
        .state('app.product.productAdd', {
            url: '/new',
            component: ProductCreateComponent.name
        })
        .state('app.offers', {
            url: '/offers',
            component: OffersComponent.name,
            resolve: {
                products : resolveProducts
            }
        })
        .state('app.product.productEdit', {
            url: '/:productId/edit',
            component: ProductEditComponent.name,
            resolve: {
                product : resolveProduct
            }
        })
        .state('app.productDetail', {
             url: '/products/:productId',
             component: ProductDetailComponent.name,
             resolve: {
                 product : resolveProduct
             }
        })
        .state('app.product.productsSeller', {
            url: '/seller/:sellerId',
            component: ProductsSellerComponent.name,
            resolve: {
                products : resolveProductsSeller
            }
        })
        .state('app.login', {
            url: '/login',
            component: LoginComponent.name,
        })
        .state('app.signup', {
            url: '/signup',
            component: SignupComponent.name,
        })
        .state('app.shoppingCart', {
            url: '/myshoppingcart',
            component: ShoppingCartComponent.name,
            resolve: {
                products : resolveShoppingCart
            }
        })
}
