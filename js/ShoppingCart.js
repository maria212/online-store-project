$(document).ready(()=>{

    ///Корзина угловая общая для всех
    let mycart = new Cart('js/cart/getCart.json', "mainSmallIconCart"); 

    //Страница Shopping Cart
    let cart = new Cart('js/cart/getCart.json', "ShoppingCart", ".all-products-in-cart");

    //Обработчик изменения значения в поле количество
    $('.all-products-in-cart').on("change", ".quantity", e =>{
        mycart._updateCartFromShoppingCart(e.target);
    });

       //Обработчик изменения значения в поле количество
    $('.all-products-in-cart').on("click", ".delete-button", e =>{
        mycart._removeProductFromShoppingCart(e.target);
    });

    $(`.products-in-cart-buttons__button-a`).on("click", e => {
        mycart.deleteAllProductInCart();
    })



        /* document.querySelector(`.products-in-cart`).addEventListener('click', ()=>{
    }); */
});