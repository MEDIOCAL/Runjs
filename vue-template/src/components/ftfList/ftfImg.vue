<template>
	<div class="fl ftfImgList">
	    <ul>
	        <li v-bind:class="{fl:index%2==0,leftImg:index%2==0,fr:index%2==1}" v-for="(item,index) of getftfImgList">
	            <img v-bind:src="'http://www.zfwx.com/'+item.adImg">
	            <p class="itemInfo"><span class="ftfName">{{item.adTitle}}</span></p>
	            <div class="linkContainer" @click='link(item.adUrl)'>
	                <p class="signUpInfo" @click="window.location.href='item.adUrl'">
	                    {{item.endDays>0?"距离报名时间还有":"报名已结束"}}
	                    <span class="days">{{item.endDays>0?item.endDays:''}}</span>
	                    {{item.endDays>0?"天":""}}
	                </p>
	                <a v-bind:href="item.adUrl" target="_blank" class="ftfImgLink">点击进入</a>
	            </div>
	        </li>
	    </ul>
	</div>
</template>

<script>
	import axios from 'axios';
	import {getFtfImg} from '../../../api/index.js';
	export default {
		data : function(){
			return {
				ftfImgList :[
					{
						adImg : '',
						adTitle : '',
						adUrl : '',
						endDays : ''
					}
				]
			}
		},
		computed : {
			getftfImgList : function(){
				return this.ftfImgList.splice(0,4);
			}
		},
		methods : {
			getDatas : function(){
				axios[getFtfImg.method](getFtfImg.url).then((response)=>{
					this.ftfImgList = response.data.result.data;
				});	
			},
			link : function(url){
				window.open(url);
			}
		},
		mounted : function(){
			this.getDatas();
		}
	}
</script>
<style lang='sass'>
	/*面授4图片列表*/
	.ftfImgList{box-sizing:border-box;width:813px;height:100%;padding:0px 0 0 30px;}
	.ftfImgList ul li{box-sizing:border-box;position:relative;width:380px;height:200px;margin-bottom:19px;cursor: pointer}
	.ftfImgList ul li .linkContainer{display:none}
	.ftfImgList ul li:hover .linkContainer{display:block;box-sizing:border-box;position: absolute;top:20px;left:20px;width:340px;height:160px;padding-top:20px;background:rgba(11,103,255,0.6) ;cursor: pointer}
	.ftfImgList ul li .linkContainer p.signUpInfo{height:50px;line-height:50px;color:#fff;font-size:18px;width:100%;text-align:center;}
	.ftfImgList ul li .linkContainer p.signUpInfo .days{font-size:40px;}
	.ftfImgList ul li .linkContainer .ftfImgLink{display: block;width: 124px;height: 29px;margin: 8px auto;border: 2px solid #fff;border-radius: 17px;line-height: 29px;text-align: center;font-size: 14px;color: #fff;}

	.ftfImgList ul li p.itemInfo{box-sizing:border-box;position:absolute;bottom:0;width:100%;height:42px;font-size:18px;color:#fff;background-color: #000;opacity: 0.6}
	.ftfImgList ul li:hover p.itemInfo{display:none}
	.ftfImgList ul li p.itemInfo .ftfName{display: block;overflow: hidden;height:42px;line-height:42px;padding:0 10px;white-space: nowrap;text-overflow: ellipsis}
	.ftfImgList ul li img{height:100%;width:100%}
	.ftfImgList ul li.leftImg{margin-right:20px;}
</style>