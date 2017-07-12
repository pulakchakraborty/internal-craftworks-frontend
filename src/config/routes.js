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
import CheckoutComponent from './../components/view-checkout/view-checkout.component';
import CheckOutSuccessComponent from './../components/view-checkoutsuccess/view-checkoutsuccess.component';
import AboutUsComponent from './../components/view-AboutUs/view-AboutUs.component';
import SearchProductsComponent from './../components/search-products/search-products.component';

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

resolveCheckOut.$inject = [ProductsService.name];
function resolveCheckOut(productsService){
    return productsService.list();
}

resolveSearch.$inject = ['$stateParams', ProductsService.name];
function resolveSearch($stateParams,productsService){
    return productsService.search($stateParams.keyword);
}

config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$windowProvider'];
export default function config ($stateProvider, $urlRouterProvider, $locationProvider, $windowProvider){

    //let $window = $windowProvider.$get();
    // For any unmatched url, redirect to /home
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('home', {
            url: '/',
            component: HomeComponent.name,
            onEnter: function(){
                $windowProvider.$get().document.title = "CraftWorks | Buy from local handicraft artists";
            }
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
            component: ProductCreateComponent.name,
            onEnter: function(){
                $windowProvider.$get().document.title = "CraftWorks Designer Zone | Add a new product";
            }
        })
        .state('app.offers', {
            url: '/offers',
            component: OffersComponent.name,
            onEnter: function(){
                $windowProvider.$get().document.title = "CraftWorks | Explore our handicraft products";
            },
            resolve: {
                products : resolveProducts
            }
        })
        .state('app.productSearch', {
            url: '/search/:keyword',
            component: SearchProductsComponent.name,
            onEnter: function(){
                $windowProvider.$get().document.title = "CraftWorks | Explore our handicraft products";
            },
            resolve: {
                results : resolveSearch
            }
        })
        .state('app.product.productEdit', {
            url: '/:productId/edit',
            component: ProductEditComponent.name,
            onEnter: function(){
                $windowProvider.$get().document.title = "CraftWorks | Designer Zone: Edit a product";
            },
            resolve: {
                product : resolveProduct
            }
        })
        .state('app.productDetail', {
            url: '/products/:productId',
            component: ProductDetailComponent.name,
            onEnter: function(){
                $windowProvider.$get().document.title = "CraftWorks | Product details";
            },
            resolve: {
                 product : resolveProduct
            }
        })
        .state('app.product.productsSeller', {
            url: '/seller/:sellerId',
            component: ProductsSellerComponent.name,
            onEnter: function(){
                $windowProvider.$get().document.title = "CraftWorks | Designer Zone: My offered products";
            },
            resolve: {
                products : resolveProductsSeller
            }
        })
        .state('app.login', {
            url: '/login',
            component: LoginComponent.name,
            onEnter: function(){
                $windowProvider.$get().document.title = "CraftWorks | Log in";
            }
        })
        .state('app.signup', {
            url: '/signup',
            component: SignupComponent.name,
            onEnter: function(){
                $windowProvider.$get().document.title = "CraftWorks | Sign up";
            }
        })
        .state('app.shoppingCart', {
            url: '/myshoppingcart',
            component: ShoppingCartComponent.name,
            resolve: {
                products : resolveShoppingCart
            }
        })
        .state('app.checkout', {
            url: '/checkout',
            component: CheckoutComponent.name,
            resolve: {
                products : resolveCheckOut
            }
        })
        .state('app.checkoutsuccess', {
            url: '/checkoutsuccess',
            component: CheckOutSuccessComponent.name,
        })
        .state('app.aboutus', {
            url: '/aboutus',
            component: AboutUsComponent.name,
        })
}
