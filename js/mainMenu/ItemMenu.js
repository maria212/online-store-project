class ItemMenu {
    constructor(title, href) {
        this.title = title;
        this.href = href;
    }
    render() {
        return `<li><a href="${this.href}">${this.title}</a></li>`;
    }

}