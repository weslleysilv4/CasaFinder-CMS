module.exports = {
    /**
     * Retorna true caso o email e senha especificado seja
     * um Admin.
     * @param {Admin} Admin 
     * @returns boolean 
     */
    isAdmin: (Admin) => {
        return Admin.email == process.env.ADMIN_EMAIL
        && Admin.password == process.env.ADMIN_PASSWORD
    }
}