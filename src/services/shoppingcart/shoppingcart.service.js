'use strict';

function Shoppingcart(cartName, $state) {
    this.cartName = cartName;
    this.clearCart = false;
    this.checkoutParameters = {};
    this.items = [];
    this.skuArray = [];
    // load items from local storage when initializing
    this.loadItems();
    this.$state = $state;
}


//----------------------------------------------------------------
// items in the cart
//
function CartItem(sku, name, description, price, quantity, image, category, vid) {
    this.sku = sku;
    this.name = name;
    this.description = description;
    this.image = image;
    this.category = category;
    this.price = price * 1;
    this.quantity = quantity * 1;
    this.vid = vid;
    this.status = 0;
}

// load items from local storage
Shoppingcart.loadItems = function () {
    var items = localStorage !== null ? localStorage[this.cartName + '_items'] : null;
    if (items !== null && JSON !== null) {
        try {
            items = JSON.parse(items);
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.sku !== null && item.name !== null && item.price !== null) {
                    item = new CartItem(item.sku, item.name, item.slug, item.mrp, item.price, item.quantity, item.image, item.category, item.size, item.weight, item.vid);
                    this.items.push(item);
                }
            }

        }
        catch (err) {
            // ignore errors while loading...
        }
    }
};

// adds an item to the cart
Shoppingcart.addItem = function (product,quantity) {
    quantity = this.parseInt(quantity);
    if (quantity !== 0) {
        // update quantity for existing item
        var found = false;
        for (var i = 0; i < this.items.length && !found; i++) {
            var item = this.items[i];
            if (item.sku === product.sku && item.vid === product.vid) {
                found = true;
                item.quantity = parseInt(item.quantity) + quantity;
                if(item.weight==null){item.weight = 0;}
                item.slug=product.slug
                if (item.quantity <= 0) {
                    this.items.splice(i, 1);
                    this.skuArray.splice(i,1);
                    this.variantsArray.splice(i,1);
                }
            }
        }

        // new item, add now
        if (!found && product.price) {
            var itm = new CartItem(product.name);
            this.items.push(itm);


        }

        // save changes
        this.saveItems();
    }
};

// save items to local storage
Shoppingcart.saveItems = function () {
    if (localStorage !== null && JSON !== null) {
        localStorage[this.cartName + '_items'] = JSON.stringify(this.items);
    }
};


export default class ShoppingcartService {

    static get $inject(){
        return ['$http', 'API_URL', 'UserService', '$state'];
    }

    constructor($http,UserService,ProductsService,$state) {
        this.$http = $http;
        this.UserService = UserService;
        this.ProductsService = ProductsService;
        this.$state = $state;

    }

    static get name(){
        return 'ShoppingcartService';
    }

    list() {

        let url = this.resourceUrl;
        return this.$http.get(url).then(responce => {

            return new Promise((resolve, reject) => {
                resolve(responce.data);

            });

        });

    }

    get(id) {
        let url = `${ this.resourceUrl }${ id }`;
        return this.$http.get(url).then(responce => {

            return new Promise((resolve, reject) => {
                resolve(responce.data);
            });

        })
    }


    create(product) {
        let url = this.resourceUrl;
        return this.$http.post(url,product).then(responce => {

            return new Promise((resolve, reject) => {
                resolve(responce.data);
            });

        })
    }

    delete(id) {
        let url = `${ this.resourceUrl }${ id }`;
        return this.$http.delete(url).then(responce => {

            return new Promise((resolve, reject) => {
                resolve(responce.status);
            });

        })
    }

    update(product) {
        let url = `${ this.resourceUrl }${ product['_id'] }`;
        return this.$http.put(url,product).then(responce => {

            return new Promise((resolve, reject) => {
                resolve(responce.data);
            });

        })
    }

    listProducts(id) {
        // make sure that user is not able to see product listing of another user
        let requestingUser = this.UserService.getCurrentUser();
        if (requestingUser['_id'] === id) {
            let url = `${ this.resourceUrl }${ this.extraUrl }${ id }`;
            return this.$http.get(url).then(responce => {

                return new Promise((resolve, reject) => {
                    resolve(responce.data);

                });
            });
        } else {
            this.$state.go('home',{});
        }

    }

    listShoppingCart () {
        let url = this.resourceUrl;
        return this.$http.get(url).then(responce => {

            return new Promise((resolve, reject) => {
                resolve(responce.data);

            });

        });
    }

    addItem(product,quantity) {
        //quantity = this.parseInt(quantity);
        if (quantity !== 0) {
            // update quantity for existing item
            var found = false;
            // for (var i = 0; i < this.items.length && !found; i++) {
            //     var item = this.items[i];
            //     if (item.sku === product.sku && item.vid === product.vid) {
            //         found = true;
            //         //item.quantity = parseInt(item.quantity) + quantity;
            //         if(item.weight==null){item.weight = 0;}
            //         item.slug=product.slug
            //         if (item.quantity <= 0) {
            //             this.items.splice(i, 1);
            //             this.skuArray.splice(i,1);
            //             this.variantsArray.splice(i,1);
            //         }
            //     }
            // }

            // new item, add now
            if (!found && product.price) {
                var itm = new CartItem(product.name);
                this.items.push(itm);


            }

            // save changes
            this.saveItems();
        }
    };

// save items to local storage
    saveItems() {
        if (localStorage !== null && JSON !== null) {
            localStorage[this.cartName + '_items'] = JSON.stringify(this.items);
        }
    };

}
