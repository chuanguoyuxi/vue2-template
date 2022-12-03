
const common = {
  state: {
    isLock: false
  },
  mutations: {
    SET_LOCK: (state, isLock) => {
      state.isLock = isLock
    }
  }
}
export default common
