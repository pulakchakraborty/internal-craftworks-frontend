'use strict';

import AppContentComponent from './../components/app-content/app-content.component';
import HomeComponent from './../components/view-home/view-home.component';
import MoviesComponent from './../components/view-movies/view-movies.component';
import MovieComponent from './../components/view-movie/view-movie.component';
import MovieEditComponent from './../components/view-movie-edit/view-movie-edit.component';
import MovieCreateComponent from './../components/view-movie-create/view-movie-create.component';
import LoginComponent from './../components/view-login/view-login.component';
import SignupComponent from './../components/view-signup/view-signup.component'
import ShopComponent from './../components/view-shop/view-shop.component'

import MoviesService from './../services/movies/movies.service';


resolveMovie.$inject = ['$stateParams', MoviesService.name];
function resolveMovie($stateParams,moviesService){
    return moviesService.get($stateParams.movieId);
}

resolveMovies.$inject = [MoviesService.name];
function resolveMovies(moviesService){
    return moviesService.list();
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
        .state('app.movies', {
            url: '/movies',
            component: MoviesComponent.name,
            resolve: {
                movies : resolveMovies
            }
        })
        .state('app.movieAdd', {
            url: '/movies/new',
            component: MovieCreateComponent.name
        })
        .state('app.movie', {
            url: '/movies/:movieId',
            component: MovieComponent.name,
            resolve: {
                movie : resolveMovie
            }
        })
        .state('app.shop', {
            url: '/shop/:category',
            component: ShopComponent.name
        })
        .state('app.movieEdit', {
            url: '/movies/:movieId/edit',
            component: MovieEditComponent.name,
            resolve: {
                movie : resolveMovie
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
}

