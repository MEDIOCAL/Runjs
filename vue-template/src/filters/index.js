export function aa (data){

}
export function limits(data,num) {
	let newData = [];
	data.map((item,index)=>{
		if(index<num){
			newData[index] = item;
		}
	})	
	return newData;
}
export function toArray(data,str) {
	return data.split(str)[0];
}
export function date(data,str){
	let newDate = new Date(data);
	let date = {
		Y : newDate.getFullYear(),
		M : newDate.getMonth() + 1,
		D : newDate.getDate(),
		h : newDate.getHours(),
		m : newDate.getMinutes(),
		s : newDate.getSeconds()
	}
	if(date.M < 10){
		date.M = '0'+date.M;
	}
	if(date.D < 10){
		date.D = '0'+date.D;
	}
	if(date.h < 10){
		date.h = '0'+ date.h;
	}
	if(date.m < 10){	
		date.m = '0'+ date.m; 
	}
	if(date.s < 10){
		date.s = '0'+ date.s;
	}

	if(str == 'YYYY-MM-DD hh:mm:ss'){
		return date.Y+'-'+date.M+'-'+date.D+' '+date.h+':'+date.m+':'+date.s;
	}else if(str == 'YYYY/MM/DD hh:mm:ss'){
		return date.Y+'/'+date.M+'/'+date.D+' '+date.h+':'+date.m+':'+date.s;
	}else if(str == 'YYYY-MM-DD'){
		return date.Y+'-'+date.M+'-'+date.D;
	}else if(str == 'YYYY/MM/DD'){
		return date.Y+'/'+date.M+'/'+date.D;
	}else{
		return date.Y+'-'+date.M+'-'+date.D+' '+date.h+':'+date.m+':'+date.s;
	}
}