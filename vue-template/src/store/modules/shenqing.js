const state = {
    shenqingClose : false,
	shenqingInfo : {}
}

const mutations = {
    SETCOOP(state,boolen){
		state.shenqingClose = boolen;
	},
	SETSHENQINGINFO(state,obj){
		state.shenqingInfo = obj
	}
}
const getters = {
 	getCoop : state => state.shenqingClose,
	getShenQingInfo : state => state.shenqingInfo
}

// actions
const actions = {
	setCoop({commit},boolen){
		commit('SETCOOP',boolen);
	},
	setShenqingInfo({commit},obj){
		commit('SETSHENQINGINFO',obj);
	} 
}

export default {
  state,
  mutations,
  getters,
  actions
}