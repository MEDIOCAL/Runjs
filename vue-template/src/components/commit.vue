<template>
	<div class='fl studyHappy'>
		<div class="title" style="margin-top:60px;">
	        <div class="line_shu fl"></div>
	        <span class="title_show fl">我学习我快乐</span>
	    </div>
		<div class='commit-wrap' v-for='d in myCommit'>
			<div class='img'><img v-bind:src="d.photoUrl"></div>
			<div class='right'>
				<p class='titles'> <span class='timer'>{{d.commentTime | date('YYYY-MM-DD hh-mm-ss')}}</span> <span class='name'>{{d.realName}}</span></p>
				<p class='content'>
					{{d.content}}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	import { getCommit } from '../../api/index.js';
	import axios from 'axios';
	export default {
		data : function(){
			return {
				myCommit : {}
			}
		},
		created : function(){
			axios[getCommit.method](getCommit.url).then( (response)=>{
				this.myCommit = response.data.result.data;
			})
		}
	}
</script>

<style lang='sass'>
/*评论模块 -------- start*/
	.commit-wrap{
	    width:260px;
	    overflow:hidden;
	    padding:15px 5px 15px 5px;
	    border-bottom:1px solid #e8e8e8;
	}
	.commit-wrap .img{
	    float:left;
	    width:47px;
	    height:47px;
	    padding:1px;
	    border:1px solid #ccc;
	}
	.commit-wrap .img img{
	    width:47px;
	    height:47px;
	    text-align: center;

	}
	.commit-wrap .right{
	    float:right;
	    width:197px;
	}
	.commit-wrap .right .titles{
	    width:100%;
	    height:14px;
	    line-height:14px;
	    overflow:hidden;
	    margin:0;
	    padding:0px;
	}
	.commit-wrap .right .timer{
	    float:right;
	    color:#999;
	    font-size:14px;
	}
	.commit-wrap .right .name{
	    float:left;
	    color:#4374ff;
	    font-size:14px;
	}
	.commit-wrap .right .content{
	    width:100%;
	    margin-top:5px;
	    font-size:12px;
	    line-height:17px;
	    height:35px;
	}
	.studyHappy {
	    box-sizing: border-box;
	    width: 325px;
	    padding: 0 30px;
	    margin-right: 26px;
	}
/*评论模块 -------- end*/
</style>