export const isLogin  = ({commit}) => {
	commit('ISLOGIN')
}
export const signOut  = ({commit}) => {
	commit('SIGNOUT')
}
export const setUserInfo  = ({commit},userInfo) => {
	commit('SETUSERINFO',userInfo)
}
export const setTipShow = ({commit},status) => {
	commit('SETTIPSHOW',status);
}
export const setTipContent = ({commit},content) => {
	commit('SETTIPCONTENT',content);
}
export const setSearchBg = ({commit},imgUrl) => {
	commit('SETSEARCHBG',imgUrl)
}
export const setSearchData = ({commit},searchData)  => {
	commit('SETSEARCHDATA',searchData)
}
export const setPath = ({commit},path)  => {
	commit('SETPATG',path)
}
export const setDianke = ({commit},dianke)  => {
	commit('SETDIANKE',dianke)
}
export const setCoop = ({commit},boolen) => {
	commit('SETCOOP',boolen);
}
export const setShenqingInfo = ({commit},obj) => {
	commit('SETSHENQINGINFO',obj);
}