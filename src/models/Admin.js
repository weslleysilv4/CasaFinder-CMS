module.exports = {
  /**
   * Retorna true caso o email e senha especificado seja
   * um Admin.
   * @param {Admin} Admin
   * @returns boolean
   */
  isAdmin: (Admin) => {
    if (!Admin) return false

    return (
      Admin.username == process.env.ADMIN_USERNAME &&
      Admin.email == process.env.ADMIN_EMAIL &&
      Admin.password == process.env.ADMIN_PASSWORD
    )
  },
}
