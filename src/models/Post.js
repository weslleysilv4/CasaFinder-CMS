module.export = class Post {
  #id
  #title
  #description
  #price
  #createdBy
  #createdAt
  #address
  #imgURL

  constructor(Post) {
    this.#id = this.calculateId()
    this.#title = Post.title
    this.#description = Post.description
    this.#price = Post.price
    this.#createdBy = Post.createdBy
    this.#createdAt = this.DataFormat(new Date())
    this.#address = Post.address
    this.#imgURL = Post.imgURL
  }

  get id() {
    return this.#id
  }
  get title() {
    return this.#title
  }
  get description() {
    return this.#description
  }
  get price() {
    return this.#price
  }
  get author() {
    return this.#createdBy
  }
  get creationDate() {
    return this.#createdAt
  }
  get address() {
    return this.#address
  }

  calculateId() {
    return Math.floor(Math.random() * 90000) + 10000
  }

  DataFormat(data) {
    const dia = data.getDate()
    const mes = data.getMonth() + 1
    const ano = data.getFullYear()

    if (dia < 10) dia = '0' + dia
    if (mes < 10) mes = '0' + mes

    return dia + '/' + mes + '/' + ano
  }
}
