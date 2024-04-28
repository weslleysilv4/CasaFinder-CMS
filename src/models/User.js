const { v4: uuidv4 } = require('uuid');

export class User {
    #uuid;
    #username;
    #email;
    #password;
    #posts

    constructor(User) {
        this.#uuid = uuidv4();
        this.#username = User.username;
        this.#email = User.email;
        this.#password = User.password;
        this.#posts = [];
    }

    get id() { return this.#uuid };
    get username() { return this.#username };
    get email() { return this.#email };
    get password() { return this.#password };
    get posts() { return this.#posts };
}