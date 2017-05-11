import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store =  new Vuex.Store({
	state : {
		isLogin  : false,
		userInfo : 'admin',
		toPath   : 'lawyerfirm',
		searchBg : 'lvsuoImg.jpg',
		isDianKe : false,
		searchData : {
			"newsCourseMaxPage"  : "",
            "recomCourseMaxPage" : "",
            "weekCourseMaxPage"  : "",
            "newsCourseCurrent"  : 2,
            "recomCourseCurrent" : 2,
            "weekCourseCurrent"  : 2,
            "newsIfNext" : true,
            "newsIfPre"  : false,
            "recomIfNext" : true,
            "recomIfPre"  : false,
            "weekIfNext" : true,
            "weekIfPre"  : false,
            "index1" : 1,
            "index2" : 1,
            "index3" : 1,
            "weekCourseList"  : [],
            "recomCourseList" : [],
            "newsCourseList"  : [],
            "searchText" : ''
		},
		shenqingClose : false,
		shenqingInfo : {}
	},
	mutations : {
		ISLOGIN (state) {
			state.isLogin = true;
		},
		SIGNOUT (state) {
			state.isLogin = false;
		},
		SETUSERINFO (state,userInfo){
			state.userInfo = userInfo;
		},
		SETTIPCONTENT(state,content){
			state.tipContent = content;
		},
		SETTIPSHOW(state,status){
			state.tipShow = status;
		},
		SETSEARCHBG(state,imgUrl){
			state.searchBg = imgUrl;
		},
		SETSEARCHDATA(state,searchData){
			state.searchData.newsCourseMaxPage  = searchData.newsCourseMaxPage;
			state.searchData.recomCourseMaxPage = searchData.recomCourseMaxPage;
			state.searchData.weekCourseMaxPage  = searchData.weekCourseMaxPage;
			state.searchData.newsCourseCurrent  = searchData.newsCourseCurrent;
			state.searchData.recomCourseCurrent = searchData.recomCourseCurrent;
			state.searchData.weekCourseCurrent  = searchData.weekCourseCurrent;
			state.searchData.newsIfNext  = searchData.newsIfNext;
			state.searchData.newsIfPre   = searchData.newsIfPre;
			state.searchData.recomIfNext = searchData.recomIfNext;
			state.searchData.recomIfPre  = searchData.recomIfPre;
			state.searchData.weekIfNext  = searchData.weekIfNext;
			state.searchData.weekIfPre   = searchData.weekIfPre;
			state.searchData.index1   = searchData.index1;
			state.searchData.index2   = searchData.index2;
			state.searchData.index3   = searchData.index3;
			state.searchData.newsCourseList  = searchData.newsCourseList;
			state.searchData.recomCourseList = searchData.recomCourseList;
			state.searchData.weekCourseList  = searchData.weekCourseList;
			state.searchData.searchText  = searchData.searchText;
		},
		SETPATG(state,path){
			state.toPath = path;
		},
		SETDIANKE(state,dianke){
			state.isDianKe = dianke;
		},
		SETCOOP(state,boolen){
			state.shenqingClose = boolen;
		},
		SETSHENQINGINFO(state,obj){
			state.shenqingInfo = obj
		}
	},
	actions : {
		isLogin ({commit}){
			commit('ISLOGIN')
		},
		signOut ({commit}){
			commit('SIGNOUT')
		},
		setUserInfo ({commit},userInfo){
			commit('SETUSERINFO',userInfo)
		},
		setTipShow({commit},status){
			commit('SETTIPSHOW',status);
		},
		setTipContent({commit},content){
			commit('SETTIPCONTENT',content);
		},
		setSearchBg({commit},imgUrl){
			commit('SETSEARCHBG',imgUrl)
		},
		setSearchData({commit},searchData) {
			commit('SETSEARCHDATA',searchData)
		},
		setPath({commit},path) {
			commit('SETPATG',path)
		},
		setDianke({commit},dianke) {
			commit('SETDIANKE',dianke)
		},
		setCoop({commit},boolen){
			commit('SETCOOP',boolen);
		},
		setShenqingInfo({commit},obj){
			commit('SETSHENQINGINFO',obj);
		}
	},
	getters: {
		getLoginState (state) {
			return state.isLogin;
		},
		getUserInfo (state) {
			return state.userInfo;
		},
		getTipShow (state) {
			return state.tipShow;
		},
		getTipContent (state) {
			return state.tipContent;
		},
		getPath (state) {
			return state.toPath;
		},
		getBackground (state) {
			return state.searchBg;
		},
		getSearchData (state) {
			return state.searchData;
		},
		getDianke (state){
			return state.isDianKe;
		},
		getCoop (state){
			return state.shenqingClose;
		},
		getShenQingInfo (state){
			return state.shenqingInfo
		}
	}
});
export default store;