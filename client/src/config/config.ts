const backendUrl = `${process.env.REACT_APP_BACKENDURL}/api/v1`

export default {
  login: `${backendUrl}/login?returnTo=${window.location.origin}`,
  signup: `${backendUrl}/signup`,
  isAuthAndGetUser: `${backendUrl}/isAuthAndGetUser`,
  logout: `${backendUrl}/logout?returnTo=${window.location.origin}`,
}
