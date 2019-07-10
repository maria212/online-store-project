class Cart{
    /**
     * 
     * @param {string} source json file
     * @param {string} typeOfRendering "mainSmallIconCart" для общей корзины в правом верхнем углу, "ShoppingCart" - страница Shopping Cart
     * @param {string} container Селектор контейнера, в который нужно поместить
     */
    constructor(source, typeOfRendering, container = '.my-cart') { //my
        this.container = container;
        this.source = source;
        this.countGoods = 0; // Общее кол-во товаров
        this.amount = 0; // Сумма товаров в корзине
        this.basketItems = []; // Товары в корзине
        this.typeOfRendering = typeOfRendering; //обязательный! определяет, что отрисовывать
        this._init();
    }

    _init(){
        switch (this.typeOfRendering) {
            case "mainSmallIconCart":
                this._initmainSmallIconCart();                
                break;
            case "ShoppingCart":
                this._initShoppingCart();  
                break;   
            default:
                break;
        }
    }

    /**
     * Инициализирует отрисовку общей корзины для всех страниц
     */
    _initmainSmallIconCart(){
        this._render();
            if (!localStorage.getItem('myitems')){
                fetch(this.source)
                    .then(result => result.json())
                    .then(data => {
                        for (let product of data.contents){
                            this.basketItems.push(product);
                            this._renderItem(product);
                        }
                        this.countGoods = data.countGoods;
                        this.amount = data.amount;
                        this._setInLocalStorage();
                        this._renderSum();
                    });
            } else {
                this.basketItems = JSON.parse(localStorage.getItem('myitems'));
                this.countGoods = JSON.parse(localStorage.getItem('countGoods'));
                this.amount = JSON.parse(localStorage.getItem('amount'));
                for (let product of this.basketItems){
                    this._renderItem(product);
                    this._updateCart(product);
                }
                this._renderSum();
            }
    }

    _initShoppingCart(){
        let $renderigHTML = $(`<section class="container all-products-in-cart">
        <table class="products-in-cart">
            <tr>
                <th>Product Details</th>
                <th></th>
                <th>unite Price</th>
                <th>Quantity</th>
                <th>shipping</th>
                <th>subtotal</th>
                <th>action</th>
            </tr>
        </table>
        <div class="products-in-cart-buttons">
            <a href="#" class="products-in-cart-buttons__button-a">cLEAR SHOPPING CART</a>
            <a href="#" class="products-in-cart-buttons__button-a">cONTINUE sHOPPING</a>
        </div>`);
        $renderigHTML.appendTo(this.container);

            if (!localStorage.getItem('myitems')){
                fetch(this.source)
                    .then(result => result.json())
                    .then(data => {
                        for (let product of data.contents){
                            this.basketItems.push(product);
                            this._renderItemShoppingCart(product);
                        }
                        this.countGoods = data.countGoods;
                        this.amount = data.amount;
                        this._setInLocalStorage();
                        this._renderSumShoppingCart();
                    });
            } else {
                this._getLocalStorage();
                this._setInLocalStorage();
                for (let product of this.basketItems){
                    this._renderItemShoppingCart(product);
                    this._updateCart(product);
                }
                this._renderSumShoppingCart();
            }
    }

    _renderItemShoppingCart(product){
        let $rend = $(` 
         <tr class="tr_no-th product-in-cart__product-element" data-id="${product.id_product}">
            <td>
                <a class="photo-product-in-cart" href="SinglePage.html">
                    <img class="photo-product-in-cart__img" src="${product.img_min}" alt=""></a>
            </td>
            <td class="describe-column">
                <a href="SinglePage.html" class="products-in-cart__header">${product.product_name}</a>
                <p>Color: <span>Red</span></p>
                <p>Size: <span>XLL</span></p>
            </td>
            <td>
                <p>$${product.price}</p>
            </td>
            <td><label for="quantity">
                <input type="number" class="quantity" value="${+product.quantity}" size="3" width="3" pattern="[1-9]{1,3}">
            </label></td>
            <td>
                <p>FREE</p>
            </td>
            <td>
                <p class="data-subtotal">$${product.price * product.quantity}</p>
            </td>
            <td><a class="delete-button" href="#"><img src="images/symb1.png" alt=""></a></td>
        </tr>`);
        $rend.appendTo($(`.products-in-cart`));
    }

    _renderSumShoppingCart(){
        let $renderingSum = $(`<p class="do-order-block__coupon-discount coupon-discount__p">sub total $${this.amount}</p>
        <p class="do-order-block__coupon-discount do-order-block__text-header">grand total $${this.amount}</p>`);
        $renderingSum.appendTo($(`.do-order-block__to-checkout`));
    }

    _render() {
        let $cartItemsDiv = $('<div/>', { // my wrap for items l1
            class: 'block-my-items'
        });
        let $totalPrice = $('<div/>', {
            class: 'my-cart_total' //my total price l1
        });
        let $totalPriceText = $('<div/>', {
            class: 'my-cart_total__text' //my total price text
        });
        let $totalPriceSum = $('<div/>', {
            class: 'my-cart_total__totalsum' //my total price sum
        });
        let $btnCheckout = $('<a/>', {
            class: 'my-cart__btns', //my checkout l1
            text: 'checkout',
            href: "checkout.html"
        });
        let $btnGoToCart = $('<a/>', {
            class: 'my-cart__btns', //my GoToCart l1
            text: 'go to card',
            href: "ShoppingCart.html"
        });

        $cartItemsDiv.appendTo($(this.container));
        $totalPrice.appendTo($(this.container));
        $btnCheckout.appendTo($(this.container));
        $btnGoToCart.appendTo($(this.container));
        $totalPriceText.appendTo($totalPrice);
        $totalPriceSum.appendTo($totalPrice);

        /* $(this.container).droppable({
            drop: (event, ui) => {
                this.addProduct(ui.draggable.find('.buyBtn'));
            }
        }) */
    }

    _renderItem(product){
        let $container = $('<div/>', {
            class: 'block-my-items_item',
            'data-product': product.id_product
        });
        let $aImg = $('<a/>', {  // l1
            class: 'block-my-items_item__img',
            href: "SinglePage.html"
        });
        let $innerImgAItem = $('<img>', {
            src: product.img_min,
            alt: "Item1"
        });
        let $divDescribe = $('<div/>', {
            class: "block-my-items_item__describe"  // l1
        });
        let $btnDelete = $('<button/>', {
            /* class: "fa fa-times-circle" */
        });
        let $btnIMGDelete = $('<i/>', {
            class: "fa fa-times-circle"
        });
        $aImg.appendTo($container);
        $divDescribe.appendTo($container);
        $btnDelete.appendTo($container);
        $btnIMGDelete.appendTo($btnDelete);
        $innerImgAItem.appendTo($aImg);
        $divDescribe.append($(`<a href="SinglePage.html" class="block-my-items_item-describe__name">${product.product_name}</a>`));
        $divDescribe.append($(`<span class="product-price">${product.price} $</span>`));
        $divDescribe.append($(`<span class="product-quantity data-quantity="${product.quantity}">Quantity: ${product.quantity}</span>`));
        $btnDelete.click(() => {
            this._remove(product.id_product);
        });
        $container.appendTo($('.block-my-items')); 
    }

    _renderSum(){
        $('.sum-amount').text(`Всего товаров в корзине: ${this.countGoods}`);
        $('.my-cart_total__text').text(`total`);
        $('.my-cart_total__totalsum').text(`${this.amount}$`);
    }

    /**
     * Добавляет товар в корзину
     * @param {EventTarget.element} element Элемент обработчика нажатия кнопки
     */
    addProduct(element){
        let productId = +$(element).data('id');
        let find = this.basketItems.find(product => product.id_product === productId);
        if (find){
            find.quantity++;
            this.countGoods++;
            this.amount += find.price;
            this._updateCart(find);

        this._setInLocalStorage();
        this._renderSum();
        } else {
            let product = {
                id_product: productId,
                /* price: +$(element).data('price'),
                product_name: $(element).data('name'), */
                quantity: 1,
            };
            fetch('js/cart/catalogData.json')
                .then(result => result.json())
                .then(data => {
                    let Item= data.find(pr => pr.id_product == productId);
                    product.img_min = Item.img_min; 
                    product.price = Item.price;
                    product.product_name = Item.product_name;
       
                    this.basketItems.push(product);
                    this.countGoods += product.quantity;
                    this.amount += product.price;
                    this._renderItem(product); 
                    this._setInLocalStorage();
                    this._renderSum();
                });
         }
    }

    _setInLocalStorage(){
        localStorage.setItem('myitems', JSON.stringify(this.basketItems));
        localStorage.setItem('countGoods', JSON.stringify(this.countGoods));
        localStorage.setItem('amount', JSON.stringify(this.amount));
    }

    _getLocalStorage(){
        this.basketItems = JSON.parse(localStorage.getItem('myitems'));
        this.countGoods = JSON.parse(localStorage.getItem('countGoods'));
        this.amount = JSON.parse(localStorage.getItem('amount'));
    }

    /**
     * Обновляет информацию по товару в общей угловой корзине
     * @param {Object} product 
     */
    _updateCart(product){
        let $container = $(`div[data-product="${product.id_product}"]`);
        $container.find('.product-quantity').text(`Quantity: ${product.quantity}`);
        $container.find('.product-price').text(`${product.price} $`);
    }

    /**
     * Удаление товара в выпадающей угловой корзине
     * @param {string} productId 
     */
    _remove(productId){
        //TODO: реализовать удаление элемента корзины
        //let find = this.basketItems.find(product => product.id_product === productId);
        let find = this._getProductFromBasketItems(productId);
        if(find.quantity > 1){
            find.quantity--;
            this._updateCart(find);
        } else {
            this._deleteProductFromBasketItems(find);
            //this.basketItems.splice(this.basketItems.indexOf(find), 1);
            this.__deleteProductFromAngularCat(productId);
            /* let $container = $(`div[data-product="${productId}"]`);
            $container.remove(); */
        }
        this.countGoods--;
        this.amount -= find.price;
        this._setInLocalStorage();
        this._renderSum();
    }

    _updateCartFromShoppingCart(element){
        let newQuantity = +element.value;
        let productId = +element.closest("tr").dataset.id;
        let find = this._getProductFromBasketItems(productId);  
        let oldQuantity = find.quantity; // save old quantity
        find.quantity = newQuantity; //set new quantity

        if (newQuantity > 1){ // delete prod completely
            this._updateCart(find); // updete prod angular угловую cart
            this._updateShoppingCart(find);
        } else {
            this._deleteProductFromBasketItems(find);
            this.__deleteProductFromAngularCat(productId);
            this. _updateShoppingCart(productId);
            this.__deleteHTMLProductFromShoppingCart(productId); // удаляем строку на странице

        }
        //let addingQuantity = Math.abs(); 
        let addingQuantity = newQuantity - oldQuantity;
        this.countGoods += addingQuantity;
        this.amount += addingQuantity * find.price;
     
        this._setInLocalStorage();
        this._renderSum(); //update sum angular угловую cart
        //обновить сумму на странице
        this._updateSumOnShoppingCart();
   

    }

    _getProductFromBasketItems(productId){
        return this.basketItems.find(product => product.id_product === productId);
    }
    _deleteProductFromBasketItems(find){
        this.basketItems.splice(this.basketItems.indexOf(find), 1);
    }
    __deleteProductFromAngularCat(productId){
        let $container = $(`div[data-product="${productId}"]`);
        $container.remove();
    }

    /**
     * Удаляет строку товара в Shopping cart
     * @param {number} productId 
     */
    __deleteHTMLProductFromShoppingCart(productId){
        let $container = $(`tr[data-id="${productId}"]`);
        $container.remove();
    }

    /**
     * Update product in Shopping cart page
     */
    _updateShoppingCart(product){
        let $container = $(`tr[data-id="${product.id_product}"]`);
        let $sum = product.quantity * product.price;
        $container.find('.data-subtotal').text($sum);
    }

    _updateSumOnShoppingCart(){
        $(`.coupon-discount__p`).text(`sub total $${this.amount}`);
        $(`.do-order-block__text-header`).text(`grand total $${this.amount}`);
    }
    _removeProductFromShoppingCart(element){
        let productId = +element.closest("tr").dataset.id;
        let find = this._getProductFromBasketItems(productId);
        this.__deleteHTMLProductFromShoppingCart(productId);
        let oldQuantity = find.quantity;

        this._deleteProductFromBasketItems(find);
        this.__deleteProductFromAngularCat(productId);
        this. _updateShoppingCart(productId);

        this.countGoods -= oldQuantity;
        this.amount -= oldQuantity * find.price;
     
        this._setInLocalStorage();
        this._renderSum(); //update sum angular угловую cart
        this._updateSumOnShoppingCart();
    }

    /**
     * Обработчик кнопки Clear ShoppingCart
     */
    deleteAllProductInCart(){
        this._deleteProductsFromObject(); 
        this._setInLocalStorage();

        //удалить строки в корзинах
        this.__deleteHTMLAllProductsFromShoppingCart();


        this._renderSum(); //update sum angular угловую cart
        this._updateSumOnShoppingCart();
        
        //еще обновть
       // console.dir(this);
    }

    /**
     * Очищает любой массив
     * @param {array} array 
     */
    clearArray(array){
        while(array.length > 0) {
            array.pop();
        }
    }

    /**
     * Очищает массив basketItems, а также countGoods и amount
     */
    _deleteProductsFromObject(){
        //let array = this.basketItems;
        /* while(array.length > 0) {
            array.pop();
        } */

        //this.clearArray(this.basketItems);

        this.basketItems = []; //  ССЫЛОК ВРОДЕ НЕ ДОЛЖНО ОСТАТЬСЯ
        this.amount = 0;
        this.countGoods = 0;
        console.dir(this);
        this._setInLocalStorage();
    }

    __deleteHTMLAllProductsFromShoppingCart(){
        document.querySelectorAll(`.product-in-cart__product-element, .block-my-items_item`).forEach(prod => {
            prod.remove();
        })
    }


}
