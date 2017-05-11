export const searchApi   = {
	getCity : {
		url : 'http://localhost:3000/getjson/findProvinceToMenu.do',
		method : 'get',
		obj : {},
		params : {}
	},
	getHotinfo : {
		url :'http://localhost:3000/getjson/gethotinfos.do',
		method : 'get',
		obj : {},
		params : {}
	},
	getAdverting : {
		url :'http://localhost:3000/getjson/getDjAdvertising',
		method : 'get',
		obj : {},
		params : {}
	},
	getNewsCourse : {
		url : 'http://localhost:3000/getjson/findCS',
		method : 'get',
		obj : {},
		params : {
			pageNo:1,
			pageSize:20,
			searchText:"王雷",
			csAddtime:1
		}
	},
	getRecomCourse : {
		url : 'http://localhost:3000/getjson/findCS2',
		method : 'get',
		obj : {},
		params : {
			pageNo:1,
			pageSize:20,
			searchText:"王雷",
			csTjOrder:1
		}
	},
	getWeekCourse : {
		url : 'http://localhost:3000/getjson/findCS',
		method : 'get',
		obj : {},
		params : {
			pageNo:1,
			pageSize:20,
			searchText:"王雷",
			studyweeknum:1
		}
	}
}
export const headerApi   = {
	getUserInfo : {
		url : 'http://localhost:3000/getjson/getUserInfo',
		method : 'get',
		obj : {},
		params : {}
	},
}
export const wantLisApi  = {
	url : 'http://base.zfwx.com/wydk.do',
	method : 'get',
	obj : {},
	params : {}
}
export const laterCourse = {
	url : 'http://localhost:3000/getjson/findCSNew',
	method : 'get',
	obj : {},
	params : {}
}
export const tagCourse   = {
	url : 'http://localhost:3000/getjson/findCsTag',
	method : 'get',
	obj : {},
	params : {}
}
export const wxData      = {
	url : 'http://localhost:3000/getjson/getWx',
	method : 'get',
	obj : {},
	params : {}
}
export const getFtof     = {
	url : 'http://localhost:3000/getjson/getfacetoface',
	method : 'get',
	obj : {},
	params : {}
}
export const getDjAdvert = {
	url : 'http://localhost:3000/getjson/getDjAdvertising',
	method : 'get',
	obj : {},
	params : {}
}
export const getLXNotice = {
	url : 'http://localhost:3000/getjson/getDjLXNotices',
	method : 'get',
	obj : {},
	params : {}
} 
export const getCollege = {
	url : 'http://localhost:3000/getjson/getPhForCollege',
	method : 'get',
	obj : {},
	params : {}
}
export const getCommit = {
	url : 'http://localhost:3000/getjson/getCourseComments',
	method : 'get',
	obj : {},
	params : {}
}
export const getLvsuo = {
	url : 'http://localhost:3000/getjson/getLsLists',
	method : 'get',
	obj : {},
	params : {}
}
export const getFtfList = {
	url : 'http://localhost:3000/getjson/getFtfList',
	method : 'get',
	obj : {},
	params : {}
}
export const getFtfImg = {
	url : 'http://localhost:3000/getjson/getFtfImg',
	method : 'get',
	obj : {},
	params : {}
}
export const getFaceAll = {
	url : 'http://localhost:3000/getjson/getFaceAll',
	method : 'get',
	obj : {},
	params : {}
}
export const getTchs = {
	url : 'http://localhost:3000/getjson/getTchsByTjOrder',
	method : 'get',
	obj : {},
	params : {}
}
export const getLxWx = {
	url : 'http://localhost:3000/getjson/getLxWx',
	method : 'get',
	obj : {},
	params : {}
}
export const getLxXyWx = {
	url :'http://localhost:3000/getjson/getWxsWithItems',
	method : 'get',
	obj :{},
	params :{}
}