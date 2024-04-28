export class Post {
    #id;
    #title;
    #description;
    #value;
    #createdBy
    #createdAt;
    #address;
    #url;

    constructor(Post) {
        this.#id = this.calculateId();
        this.#title = Post.title;
        this.#description = Post.description;
        this.#value = Post.value;
        this.#createdBy = Post.value;
        this.#createdAt = this.DataFormat(new Date());
        this.#address = Post.adress;
        this.#url = Post.url;
    }

    get id() { return this.#id };
    get title() { return this.#title };
    get description() { return this.#description };
    get value() { return this.#value };
    get author() { return this.#createdBy };
    get creationDate() { return this.#createdAt };
    get address() { return this.#address };

    calculateId() {
        return Math.floor(Math.random() * 90000) + 10000;
    }

    DataFormat(data) {
        const dia = data.getDate();
        const mes = data.getMonth() + 1;
        const ano = data.getFullYear();

        if (dia < 10) dia = '0' + dia;
        if (mes < 10) mes = '0' + mes;
    
        return dia + '/' + mes + '/' + ano;
    }
}