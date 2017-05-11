const state = {
	userInfo : 'admin',
	toPath   : 'lawyerfirm'
}
const mutations = {
  	SETUSERINFO (state,userInfo){
		state.userInfo = userInfo;
	},
	SETPATG(state,path){
		state.toPath = path;
	}
}
const getters = {
 	getPath : state => state.toPath,
	getUserInfo : state => state.userInfo
}

// actions
const actions = {
	setUserInfo ({commit},userInfo){
		commit('SETUSERINFO',userInfo)
	},
	setPath({commit},path) {
		commit('SETPATG',path)
	}
}
export default {
  state,
  mutations,
  getters,
  actions
}