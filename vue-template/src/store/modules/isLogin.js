const state = {
  isLogin  : false
}

const mutations = {
	SIGNOUT (state) {
		state.isLogin = false;
	},
    ISLOGIN (state) {
        state.isLogin = true;
    }
}
const getters = {
	getLoginState : state => state.isLogin
}
const actions = {
	isLogin ({commit}){
		commit('ISLOGIN')
	},
	signOut ({commit}){
		commit('SIGNOUT')
	}
}
export default {
  state,
  mutations,
  getters,
  actions
}