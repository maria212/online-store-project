class Product{
    /**
     * 
     * @param {string} id 
     * @param {string} title 
     * @param {number} price 
     * @param {string} img 
     * @param {string} container Селектор, в который нужно вывести.
     * @param {string} typeOfRendering "catalogOnMainPage" - каталог на главной странице, "CarouselRelatedProducts" - карусель сопутствующих товаров в карточке
     */
    constructor(id, title, price, img = 'https://placehold.it/200x150', container = '.mini-catalog__products', typeOfRendering){
        this.id = id;
        this.price = price;
        this.title = title;
        this.img = img;
        this.container = container;
        this.typeOfRendering = typeOfRendering;
        this._init();
    };

    _init(){
        switch (this.typeOfRendering) {
            case "catalogOnMainPage": 
                this._initcatalogOnMainPage(this.container);             
                break;
            case "CarouselRelatedProducts":
                this._initCarouselRelatedProduct();
                break;     
            default:
                break;
        }
    }

    _initCarouselRelatedProduct(){
        let $tex = $(`<div class="item" data-id=${this.id}><h4><a href="SinglePage.html"><img src=${this.img} alt="111"><span class="carousel-name-item">${this.title}</span><span class="carousel-price-item">$${this.price}</span></a><div class="flex-add-carousel"><a class="add-to-cart-btn" href="javascript:void(0)" data-id=${this.id}>Add to card</a></div></h4></div>`); 
        $tex.appendTo($('.single-page-carousel'));
    }

    /**
     * Каталог на главной странице
     * @param {string} container 
     */
    _initcatalogOnMainPage(container){
        let $wrapper = $('<div/>', {
            class: 'hover-product' // уровень 1
        });
        let $hrefWraper = $('<a/>', {
            href: "SinglePage.html" // уровень 2, в $wrapper
        });
        let $wrapperProduct = $('<div/>', {
            class: 'product' // уровень 3, в $hrefWraper
        });
        $wrapper.draggable({
            revert: true
        });
        let $blockNameAndPrice = $('<div/>', {
            class: "product-name-and-prise"
        });
        let $img = $('<img/>', {
            src: this.img
        });
        let $desc = $('<div/>', {
            class: 'desc'
        });
        let $name = $('<p/>', {
            text: this.title,
            class: "product-name"
        });
        let $price = $(`<p><span class="product-price">${this.price}$</span></p>`);
        let $blockBuyBtn = $('<div/>', {
            class: "flex-add" // уровень 2, в $wrapper
        });
        let $buyBtn = $('<a/>', {
            class: 'add-to-cart-btn',
            text: 'Add to card',
            href: "javascript:void(0)",
            'data-id': this.id,
            'data-name': this.title,
            'data-price': this.price
        });
        $hrefWraper.appendTo($wrapper);//ссылка, уровень 2
        $wrapperProduct.appendTo($hrefWraper); //уровень 3, в $hrefWraper
        $img.appendTo($wrapperProduct); //уровень 4, в $wrapperProduct
        $blockNameAndPrice.appendTo($wrapperProduct); //уровень 4, в $wrapperProduct
        $name.appendTo($blockNameAndPrice);
        $price.appendTo($blockNameAndPrice);
        $blockBuyBtn.appendTo($wrapper); //кнопка, уровень 2
        $buyBtn.appendTo($blockBuyBtn);
        $(container).append($wrapper);
    }
}