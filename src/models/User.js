const { v4: uuidv4 } = require('uuid')

module.exports = class User {
  _uuid
  _name
  _email
  _password
  _posts

  constructor(User) {
    this._uuid = uuidv4()
    this._name = User.name
    this._email = User.email
    this._password = User.password
    this._posts = []
  }

  get id() {
    return this._uuid
  }
  get name() {
    return this._name
  }
  get email() {
    return this._email
  }
  get password() {
    return this._password
  }
  get posts() {
    return this._posts
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      posts: this.posts,
    }
  }
}
