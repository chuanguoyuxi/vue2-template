
const getters = {
  token: state => state.user.token,
  roles: state => state.user.roles,
  userInfo: state => state.user.info,
  isLock: state => state.common.isLock,
  addRouters: state => state.permission.addRouters
}

export default getters
