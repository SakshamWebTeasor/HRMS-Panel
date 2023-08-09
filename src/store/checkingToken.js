function TokenExpiredError() {
    localStorage.removeItem("key")
    localStorage.removeItem("current_user")
    localStorage.removeItem("token_expire_time")
    localStorage.removeItem("login_time")
    window.location.reload(true)
    return true;
}

export default TokenExpiredError;