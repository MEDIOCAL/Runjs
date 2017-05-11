<template>
	<div class="fl ftfList">
	    <div class="leftSide fl">
	        <i class="circle"></i>
	        <div class="lineShort"></div>
	        <i class="circle"></i>
	        <div class="lineLong"></div>
	    </div>
	    <div class="ftfListInfo">
	        <div class="registing">
	            <ul>
	                <li v-for="(item,index) in ftfList" v-if="index<15">
	                    <span class="registingDateInfo fl">{{item.createTime | date('YYYY-MM-DD')}}</span>
	                    <a v-bind:href="'http://www.zfwx.com/DjActivity/getActivityInfo.do?activityId='+item.activityId" target="_blank" class="registInfoItem">{{item.activityName}}</a>
	                </li>
	            </ul>
	        </div>
	    </div>
	</div>
</template>
<script>
	import axios from 'axios';
	import {getFtfList} from '../../../api/index.js' 
	export default {
		data : function(){
			return {
				ftfList : [
					{
						createTime : '',
						activityId : '',
						activityName : ''
					}
				]
			}
		},
		methods : {
			getDatas : function(){
				axios[getFtfList.method](getFtfList.url).then((response)=>{
					this.ftfList = response.data.result.data;
				});
			}
		},
		mounted : function(){
			this.getDatas();
		}
	}
</script>
<style lang='sass'>
	/*面授文字列表*/
	.ftfList{box-sizing:border-box;width:387px;height:100%;}
	.ftfList .leftSide{box-sizing:border-box;width:40px;height:100%;padding-top:5px;}
	.ftfList .ftfListInfo{box-sizing:border-box;height:100%;overflow: hidden;}
	.ftfList .ftfListInfo .registing{box-sizing:border-box;height:100%;padding-top:7px;}
	.ftfList .ftfListInfo .registing  ul li{width:100%;height:28px;}
	.ftfList .ftfListInfo .registing  ul li span{display:block;width:80px;height:100%;text-align: center;line-height: 28px;font-size:12px;color:#858585}
	.ftfList .ftfListInfo .registing  ul li a{display:block;overflow:hidden;height:100%;line-height: 28px;font-size:12px;color:#000;white-space: nowrap; text-overflow: ellipsis;width:255px;margin-left:5px;}
	.ftfList .ftfListInfo .registing  ul li a:hover{color:#0b67ff}
	.ftfList i.circle {
	    display: block;
	    width: 10px;
	    height: 10px;
	    border: 1px solid #e5e5e5;
	    border-radius: 50%;
	    margin-left: 12px;
	}
	.ftfList .lineShort {
	    width: 1px;
	    height: 95px;
	    background-color: #e5e5e5;
	    margin-left: 17px;
	}
	.ftfList .lineLong {
	    width: 1px;
	    height: 300px;
	    background-color: #e5e5e5;
	    margin-left: 17px;
	}
</style>
