const { v4: uuidv4 } = require('uuid')

module.exports = class User {
  _uuid
  _username
  _email
  _password
  _posts

  constructor(User) {
    this._uuid = uuidv4()
    this._username = User.username
    this._email = User.email
    this._password = User.password
    this._posts = []
  }

  get id() {
    return this._uuid
  }
  get username() {
    return this._username
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
      username: this.username,
      email: this.email,
      password: this.password,
      posts: this.posts,
    }
  }
}
