<template>
	<div>
		<div class="title" style="margin-top:60px;">
           <div class="line_shu fl"></div>
           <span class="title_show fl">专家合作</span>
        </div>
        <div class='xhjm zj-xhjm'>
	        <p class='come'>如果您是行业专家，如果您愿意分享经验，那就加入点睛专家吧！</p>
	        <p class='come-t'>
	            <a href='javascript:void(0)'  @click='toSubmit()'>我要加入专家团队</a>
	        </p>
	    </div> 
	</div>
</template>
<script>
	export default{
		methods : {
			toSubmit : function(){
				let shenqing = {
					title : '专家合作申请',
					data  :[
						{
							name : '姓名',
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
	.bottomThreeParts .xhjm{
		width:420px;
		float:right;
		height:520px;
	}
	.bottomThreeParts .zj-xhjm{
		width:498px;
		float:left;
		height:500px;
		background:url('../../img/zjhz_bg.png') no-repeat 2px 286px;
	}
	.bottomThreeParts .come{
		padding:35px 70px;
		text-align: center;
		width:358px;
		font-size:18px;
		line-height:38px;
	}
	.bottomThreeParts .head-til{
		height:26px;
		line-height:26px;
		border-left:3px solid #4374ff;
		margin-bottom:15px;
	}
	.bottomThreeParts .come-t{
		height:55px;
		line-height:55px;
	}
	.bottomThreeParts .come-t a{
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
	.bottomThreeParts .submit{
		margin-top:80px;
		height:55px;
		line-height:55px;
	}
	.bottomThreeParts .submit a{
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