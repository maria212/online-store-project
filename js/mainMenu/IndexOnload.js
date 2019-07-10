window.onload = () => {
    //let mainMenuBlock = document.getElementById(`mainMenuBlock`);
    let mainMenuBlock = document.querySelector(`.container__menu`);

    let mainMenuHTML = new Memu(`menu`, `menu`, [
        new ItemMenu(`Home`, `index.html`),

        new SubmenuInBlocks(`/`,`Man`,`_`, `mega-list`, [
           /* new ItemMenu(`Dress`, `/dress`),
            new ItemMenu(`Jeans`, `/jeans`),
            new ItemMenu(`Shoes`, `/shoes`),
            new ItemMenu(`Accessories`, `/accessories`)*/
            new Submenu(`/`, `Woman`, `#`, `mega-list`, [
                new ItemMenu(`Jeans`, `/Jeans`),
                new ItemMenu(`Dress`, `/Dress`),
                new ItemMenu(`Shoes`, `/jewellery`)
            ]),
            new Submenu(`/`, `Woman`, `#`, `mega-list`, [
                new ItemMenu(`Bags`, `/bags`),
                new ItemMenu(`Jewellery`, `/jewellery`),
                new ItemMenu(`Sunglasses`, `/sunglasses`)
            ]),
        ]),


        new SubmenuInBlocks(`/`,`Men`,`_`, `mega-list`, [
            new ItemMenu(`Jeans`, `/jeans`),
            //new ItemMenu(`Accessories`, `/accessories`)
            new Submenu(`/`, `Accessories`, `mega-list`, `mega-list`, [
                new ItemMenu(`Belts`, `/belts`),
                new ItemMenu(`Sunglasses`, `/sunglasses`)
            ])
        ]),
        new SubmenuInBlocks(`/`,`Kids`,`#`, `mega-list`, [
            new ItemMenu(`Toys`, `/toys`),
            new ItemMenu(`Clothes`, `/clothes`)
        ])
    ]);

    mainMenuBlock.innerHTML = mainMenuHTML.render();
}