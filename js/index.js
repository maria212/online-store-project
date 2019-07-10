$(document).ready(() => {

    //вывожу каталог
    fetch('js/cart/catalogData.json')
        .then(result => result.json())
        .then(data => {
            for (let prod of data) {
                let productHTML = new Product(prod.id_product, prod.product_name, prod.price, prod.img_catalog, '.mini-catalog__products', "catalogOnMainPage");
            }
        });

    ///Корзина
    let mycart = new Cart('js/cart/getCart.json', "mainSmallIconCart"); 
    

    //Обработчик
    $('.mini-catalog__products').on('click', '.add-to-cart-btn', e => {
        mycart.addProduct(e.target);
    });

});