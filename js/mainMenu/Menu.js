class Memu {
    constructor(id, classname, items) {
        this.id = id;
        this.classname = classname;
        this.items = items;
    }
    render() {
        let result = `<ul id="${this.id}" class="${this.classname}">`;
        for (let item of this.items) {
            if (item instanceof ItemMenu ||
                item instanceof Submenu ||
                item instanceof SubmenuInBlocks){
                result += item.render();
            }

            /*if (item instanceof BlockDiv) {
                result += item.render();
            }*/
        }
        result += "</ul>";
        // let btnReset = `<a href="#" id="btnReset">Delete menu</a>`;
        // result += btnReset;

        return result;
    }

    reset() {
        let el =  document.getElementById(this.id);
        if (el) {
            el.remove();
        }
    }
}


class Submenu extends Memu {
    constructor(href, tittle, id, classname, items){
        super(id, classname, items);
        this.href = href;
        this.tittle = tittle;
    }

    render() {

        for (let item of this.items) {
            if (item instanceof ItemMenu ||
                item instanceof Submenu ||
                item instanceof SubmenuInBlocks){

                return  `<li><a href="${this.href}">${this.tittle}</a><div class="mega-flex"><h3>${this.tittle}</h3>${item.render()}</div></li>`;
            }
        }

       // return `<li><a href="${this.href}">${this.tittle}</a><div class="mega-flex"><h3>${this.tittle}</h3>${this.items.render()}</div></li>`;
        //return `<li><a href="${this.href}">${this.tittle}</a><h3>${this.tittle}</h3>${super.render()}</li>`;

    }
}

class SubmenuInBlocks extends Memu {
    constructor(href, tittle, id, classname, items){
        super(id, classname, items);
        this.href = href;
        this.tittle = tittle;
    }

    render() {
        return `<li><a href="${this.href}">${this.tittle}</a><div class="mega-box">${super.render()}</div></li>`;

    }
}


