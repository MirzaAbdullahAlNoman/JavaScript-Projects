let ui = new UI();


document.addEventListener('DOMContentLoaded', getProducts);


function getProducts() {
    let products = [{ 'name': 'Ruchi Dalmuth', 'price': 110 }, { 'name': 'Ruchi Jhal Chanachur', 'price': 80 }, { 'name': 'Ruchi BBQ Chanachur', 'price': 90 }, { 'name': 'Ruchi Premium Mix Chanachur', 'price': 160 }];
    products = JSON.stringify(products);
    products = JSON.parse(products);
    ui.showProducts(products);
}

function addProductToCart(e) {
    let parent = e.target.parentElement.parentElement;
    let p = new Product (parent.children [0].textContent, parent.children [1].textContent);
    ui.showProductInCart(p);
}

function deleteProductFromCart(e) {
    let parent = e.target.parentElement.parentElement;
    let p = new Product (parent.children [0].textContent, parent.children [1].textContent);
    ui.removeProductFromCart(parent);
}
//console.log(products);
// let p1 = new Product('Ruchi Dalmuth', 110);
// let p2 = new Product('Ruchi Jhal Chanachur', 80);
// let p3 = new Product('Ruchi BBQ Chanachur', 90);
// let p4 = new Product('Ruchi Premium Mix Chanachur', 160);

