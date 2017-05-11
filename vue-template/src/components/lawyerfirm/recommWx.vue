<template>	
	<div>
        <div class="tuijianwx">
		    <div class="wxlogo_list">
		        <ul>
		            <li class="fl" v-bind:class="{last:index%4==3}" v-for="(item,index) in recommendList">
		                <a v-bind:href="'http://www.zfwx.com/wxqt/wangxiao.do?id='+item.id" target="_blank" v-bind:style="'background: url(http://image.zfwx.com'+item.logo+') no-repeat center #fff;'"></a>
		                <div class="wxInfo">
		                    <span class="fl">学员 {{item.stuNum}}</span>
		                    <span class="fl">课程 {{item.courseNum}}</span>
		                    <span class="fl">好评 {{item.commentNum}}</span>
		                </div>
		            </li>
		        </ul>
		    </div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios';
	import {wxData} from '../../../api/index.js';
	export default {
		data : function(){
			return {
				recommendList : {}
			}
		},
		created : function(){
			axios[wxData.method](wxData.url).then( (response)=>{
				this.recommendList = response.data.result.data;
			})
		}
	}
</script>
<style lang='sass'>
	.title {
	    width: 100%;
	    height: 26px;
	    margin-bottom: 18px;
	    box-sizing: border-box;
	    margin-top: 14px;
	}
	.line_shu {
	    width: 3px;
	    height: 26px;
	    background: url('../../img/icons.png') no-repeat center;
	    background-position: -172px -23px;
	    box-sizing: border-box;
	}
	.fl {
	    float: left;
	}
	.title_show {
	    display: block;
	    margin: 0 14px 0 15px;
	    color: #313131;
	    font-size: 24px;
	    line-height: 26px;
	    box-sizing: border-box;
	}
	.title .more {
	    font-size: 16px;
	    line-height: 32px;
	    color: #4374ff;
	    cursor: pointer;
	    box-sizing: border-box;
	    padding-right: 9px;
	    background: url(../../img/ls_more.png) no-repeat right 5px;
	}
	/*推荐网校*/
	.tuijianwx,.ftof_regulation,.bottomThreeParts{box-sizing: border-box;width:100%;margin-bottom:56px;}

	.wxlogo_list{box-sizing: border-box;}
	.wxlogo_list ul{box-sizing: border-box;overflow: auto;box-sizing: border-box;}
	.wxlogo_list ul li{box-sizing: border-box;position:relative;width:278px;height:130px;border:1px solid #ebebeb;margin:0 29px 30px 0;}
	.wxlogo_list ul li.last{box-sizing: border-box;width:278px;height:130px;border:1px solid #ebebeb;margin:0 0 30px 0;}
	.wxlogo_list ul li a{box-sizing: border-box;display:block;width:100%;height:100%;background-color: #fff;background-size:80%}
	.wxlogo_list ul li .wxInfo{box-sizing: border-box;display:none;justify-content: space-around;position: absolute;width:100%;height:35px;bottom:0;background-color: #0756e3;opacity: 0.7;cursor:pointer;}
	.wxlogo_list ul li:hover .wxInfo{box-sizing: border-box;display:flex;justify-content: space-around;position: absolute;width:100%;height:35px;bottom:0;background-color: #337CFF;opacity: 0.9;cursor:pointer;}
	.wxlogo_list ul li .wxInfo span{box-sizing: border-box;display:block;font-size:14px;color:#fff;line-height:35px;}

</style>	