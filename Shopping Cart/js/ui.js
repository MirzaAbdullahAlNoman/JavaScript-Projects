class UI {
    constructor() {
        this.productList = document.querySelector('#product-list');
        this.cart = document.querySelector('#cart');
    }
    showProducts(products) {
        products.forEach(product => {
            let p = new Product(product.name, product.price);
            let tr = document.createElement('tr');
            let name = document.createElement('td');
            name.appendChild(document.createTextNode(`${p.name}`));
            let price = document.createElement('td');
            price.appendChild(document.createTextNode(`${p.price}`));
            let btn_td = document.createElement('td');
            let btn = document.createElement('input');
            btn.addEventListener('click', addProductToCart)
            btn.setAttribute('type', 'button');
            btn.setAttribute('value', 'Add');
            btn_td.appendChild(btn);
            tr.appendChild(name);
            tr.appendChild(price);
            tr.appendChild(btn_td);
            this.productList.appendChild(tr);
        })
    }
    showProductInCart(product) {
        let tr = document.createElement('tr');
        let name = document.createElement('td');
        name.appendChild(document.createTextNode(`${product.name}`));
        let btn_td = document.createElement('td');
        let btn = document.createElement('input');
        btn.addEventListener('click', deleteProductFromCart)
        btn.setAttribute('type', 'button');
        btn.setAttribute('value', 'Remove');
        btn_td.appendChild(btn);
        tr.appendChild(name);
        tr.appendChild(btn_td);
        this.cart.appendChild(tr);
    }
    removeProductFromCart(product) {
        product.remove();
    }
}