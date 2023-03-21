const backendUrl = `${process.env.REACT_APP_BACKENDURL}/api/v1`

export default {
  login: `${backendUrl}/auth/login?returnTo=${window.location.origin}`,
  isAuthAndGetUser: `${backendUrl}/auth/isAuthAndGetUser`,
  logout: `${backendUrl}/auth/logout?returnTo=${window.location.origin}`,
}
