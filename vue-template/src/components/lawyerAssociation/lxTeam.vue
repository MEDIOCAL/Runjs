<template>
	<div class='xhjm'>
	   <div class="title" style="margin-top:60px;">
           <div class="line_shu fl"></div>
           <span class="title_show fl">律协合作</span>
        </div>
	    <div><img src="../../img/hzliucheng.png"></div>
	    <p class='submit'>
	        <a href='javascript:void(0)' @click='toSubmit()'>我要提交合作意向</a>
	    </p>
	 </div> 
</template>

<script>
	export default{
		methods : {
			toSubmit : function(){
				let shenqing = {
					title : '律协合作申请',
					data  :[
						{
							name : '律协名称',
							value : '',
							test : false,
							isTest : true,
							testCont : '*此处不可空白 *英文或中文',
							testFuntion : function(){
								alert(1);
							}
						},
						{
							name : '联系人',
							value : '',
							test : false,
							isTest : true,
							testCont : '*此处不可空白 *英文或中文',
							testFuntion : function(){
								alert(1);
							}
						},
						{
							name : '联系人电话',
							value : '',
							test : false,
							isTest : true,
							testCont : '*此处不可空白 *邮箱地址无效',
							testFuntion : function(){
								alert(3);
							}
						},
						{
							name : '人数',
							value : '',
							test : false,
							isTest : true,
							testCont : '*此处不可空白',
							testFuntion : function(){
								alert(3);
							}
						},
						{
							name : '联系人Email',
							value : '',
							test : false,
							isTest : true,
							testCont : '',
							testFuntion : function(){
								
							}
						},
						{
							name : '备注',
							value : '',
							test : false,
							isTest : false,
							testCont : '',
							testFuntion : function(){
								
							}
						}
					]
				}
				this.$store.dispatch('setShenqingInfo',shenqing);
				this.$store.dispatch('setCoop',true);
			}
		}
	}
</script>

<style lang='sass'>
	.xhjm{
		width:420px;
		float:right;
		height:520px;
		margin-right:50px;
	}
	.zj-xhjm{
		width:498px;
		float:left;
		height:500px;
		margin-top:50px;
		background:url('../../img/zjhz_bg.png') no-repeat 2px 286px;
	}
	.xhjm .come{
		padding:35px 70px;
		text-align: center;
		width:358px;
		font-size:18px;
		line-height:38px;
	}
	.xhjm .head-til{
		height:26px;
		line-height:26px;
		border-left:3px solid #4374ff;
		margin-bottom:15px;
	}
	.xhjm .title{
		font-size:22px;
		line-height:22px;
		height:26px;
		display:inline-block;
		padding-left:15px;
		color:#333;
		float:left;
	}
	.xhjm .come-t{
		height:55px;
		line-height:55px;
	}
	.xhjm .come-t a{
		display:block;
		width:285px;
		height:55px;
		line-height:55px;
		text-align:center;
		font-size:18px;
		margin:auto;
		background:url('../../img/submit_bg.png') no-repeat;
		color:#fff;
	}
	.xhjm .submit{
		margin-top:80px;
		height:55px;
		line-height:55px;
	}
	.xhjm .submit a{
		display:block;
		width:285px;
		height:55px;
		line-height:55px;
		text-align:center;
		font-size:18px;
		margin:auto;
		background:url('../../img/submit_bg.png') no-repeat;
		color:#fff;
	}
</style>