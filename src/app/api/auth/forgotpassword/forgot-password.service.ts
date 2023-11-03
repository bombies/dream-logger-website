class ForgotPasswordService {

    /**
     * This function will work in a way such that when a user requests
     * a password resets, if there's already an existing one, the previous
     * request will be invalidated and the new one created and pushed to the
     * database. Once the database record has been created, a URL will be
     * generated to redirect the user to a page which allows them to reset
     * their password. The URL will be "signed", meaning it contains a signed
     * JWT token to ensure the integrity of the requests.
     */
    public async sendPasswordResetUrl() {

    }
}