module.exports = {
  /**
   * Retorna true caso o email e senha especificado seja
   * um Admin.
   * @param {Admin} Admin
   * @returns boolean
   */
  isAdmin: (Admin) => {
    if (!Admin) return false
    Admin.name == process.env.ADMIN_NAME
    return (
      Admin.email == process.env.ADMIN_EMAIL &&
      Admin.password == process.env.ADMIN_PASSWORD
    )
  },
}
