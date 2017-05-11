const state = {
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

	}
}

const mutations = {
 	SETSEARCHBG(state,imgUrl){
		state.searchBg = imgUrl;
	},
  	SETDIANKE(state,dianke){
		state.isDianKe = dianke;
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
	}
}
const getters = {
	getBackground : state => state.searchBg,
	getSearchData : state => state.searchData,
	getDianke : state => state.isDianKe
}
const actions = {
	setDianke({commit},dianke) {
		commit('SETDIANKE',dianke)
	},
	setSearchBg({commit},imgUrl){
		commit('SETSEARCHBG',imgUrl)
	},
	setSearchData({commit},searchData) {
		commit('SETSEARCHDATA',searchData)
	}
}
export default {
  state,
  mutations,
  getters,
  actions
}