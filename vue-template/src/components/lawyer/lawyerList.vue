<template>
	<div class='teacher-list'>
        <div class='teacher-msg  mb20' v-for='(d,index) in zjwxData' v-bind:class='{"mr73":(index+1)%5!=0}' @mouseenter='sumShow(true,index)' @mouseleave='sumShow(false,index)' >
           <a v-bind:href="d.tchUrl" target='blank' class='t-img'>
              <img v-bind:src="'http://www.zfwx.com/upload/'+d.tchPhoto">
              <span class='summary' v-html='d.tchNote'></span>   
           </a>
           <p class='teacherName'>{{d.tchName}}</p>
           <p class='teachDel' >{{d.tchMajor}} / {{d.tchSpedesc}}</p>
        </div>
    </div> 
</template>
<script>
	import axios from 'axios';
	import { getTchs } from '../../../api/index.js'
	export	default{
		data : function(){
			return {
				zjwxData : [
					{
						tchUrl : '',
						tchPhoto : '',
						tchNote : '',
						tchName : '',
						tchMajor : '',
						tchSpedesc : ''
					}
				]
			}
		},
		methods : {
			getData : function(){
				axios[getTchs.method](getTchs.url).then( (response)=>{
					this.zjwxData = response.data.result.data;
				})
			},
			sumShow : function(b,i){

			}
		},
		created : function(){
			this.getData();
		}
	}
</script>
<style lang='sass'>
/*专家名师 --- start*/
	.teacher-wrap{
		width:100%;
		margin-top:40px;
	}
	.teacher-list .teacher{
		width:1198px;
		margin:auto;
	}
	.teacher-list{
		overflow:hidden;
		margin-top:20px;
	}
	.teacher-list .teacher-msg{
		width:180px;
		float:left;
	}
	.teacher-list .t-img{
		display:block;
		border-radius: 50%;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
		-ms-border-radius: 50%;
		width:180px;
		height:180px;
		overflow:hidden;
		position:relative;
	}
	.teacher-list .t-img img{
		width:100%;
	}
	.teacher-list .teacherName{
		height:30px;
		line-height:35px;
		font-size:16px;
		text-align:center;
		white-space: nowrap;
		text-overflow:ellipsis;
		overflow:hidden;
	}
	.teacher-list .teachDel{
		font-size:12px;
		height:20px;
		line-height:20px;
		text-align:center;
	}
	.teacher-list .summary{
		display:block;
		border-radius: 50%;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
		-ms-border-radius: 50%;
		width:128px;
		height:128px;
		position: absolute;
		left: 0px;
		top:0px;
		padding:26px;
		background:rgba(85,130,255,0.6);
		z-index:20;
		text-align: center;
		color:#fff;
		display:none;
	}
/*专家名师 --- end*/

</style>
