class BlockDiv {
    constructor(classname, items) {
        this.classname = classname;
        this.items = items;
    }

    render() {
        let result = `<div class="${this.classname}">`;

        for (let item of this.items) {
            if (item instanceof ItemMenu ||
                item instanceof Submenu ||
                item instanceof SubmenuInBlocks){
                result += item.render();
            }

            if (item instanceof BlockDiv) {
                result += item.render();
            }
        }

        result += `</div>`;
        return result;
    }
}