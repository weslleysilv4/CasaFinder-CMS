module.exports = class Post {
  _id
  _title
  _description
  _price
  _createdBy
  _createdAt
  _address
  _imgURL
  _markdown

  constructor(Post) {
    this._id = this.calculateId()
    this._title = Post.title
    this._description = Post.description
    this._price = Post.price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
    this._createdBy = Post.createdBy
    this._createdAt = this.DataFormat(new Date())
    this._address = Post.address
    this._imgURL = Post.imgURL
    this._markdown = Post.markdown
  }

  get id() {
    return this._id
  }
  get title() {
    return this._title
  }
  get description() {
    return this._description
  }
  get price() {
    return this._price
  }
  get createdBy() {
    return this._createdBy
  }
  get createdAt() {
    return this._createdAt
  }
  get address() {
    return this._address
  }
  get imgURL() {
    return this._imgURL
  }
  get markdown() {
    return this._markdown
  }

  calculateId() {
    return (Math.floor(Math.random() * 90000) + 10000).toString()
  }

  PriceFormat() {
    return this._price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  DataFormat(data) {
    let D = data.getDate()
    let M = data.getMonth() + 1
    const Y = data.getFullYear()

    if (D < 10) D = `"0" + ${D}`
    if (M < 10) M = `"0" + ${M}`

    return `${D} + "/" + ${M} + "/" + ${Y}`
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      price: this.price,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      address: this.address,
      imgURL: this.imgURL,
      markdown: this.markdown
    }
  }
}
