$(document).ready(() => {

    //Корзина
    let mycart = new Cart('js/cart/getCart.json', "mainSmallIconCart"); 

    //карусель сопутствующих товаров
    fetch('json/relatedProducts.json')
        .then(result => result.json())
        .then(data => {
            for (let prod of data) {
                let productHTML = new Product(prod.id_product, prod.product_name, prod.price, prod.img_catalog, '.single-page-carousel', "CarouselRelatedProducts");
            }
            // код owl carousel
            $('.owl-carousel').owlCarousel({
                mergeFit:false,
                items:4,
                center:true,
                rtl:true,
                loop:true,
                margin:10,
                nav:true,
                responsive:{
                    0:{
                        items:1
                    },
                    900:{
                        items:5
                    }
                } 
            });
        });  

     //Обработчик добавления товара в корзину
    $('.related-products-wraper').on('click', '.add-to-cart-btn', e => {
        mycart.addProduct(e.target);
    }); 



});
