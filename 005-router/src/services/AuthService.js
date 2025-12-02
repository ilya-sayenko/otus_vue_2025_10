const AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY'

export class AuthService {

  static instance = null

  constructor() {
    if (AuthService.instance) {
      return AuthService.instance
    } else {
      AuthService.instance = this
    }
  }

  getAuthToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY)
  }

  isAuthenticated() {
    return !!this.getAuthToken()
  }

  logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY)
  }

  async login(username, password) {
    localStorage.setItem(AUTH_TOKEN_KEY, `${username}-${password}`)
  }
}