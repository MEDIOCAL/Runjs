<template>
	<div>
		<div class="title" style="margin-top:60px;">
           <div class="line_shu fl"></div>
           <span class="title_show fl">机构合作</span>
        </div>
        <div class="organizeCoo fl">
		    <div class="organizeCooContent">
		        <img src="../../img/orgnizeCoo.png">
		        <span class="organizeCooBtn" @click="toSubmit()">我要提交合作申请</span>
		    </div>
		</div>
	</div>
</template>
<script>
	export default{
		methods : {
			toSubmit : function(){
				let shenqing = {
					title : '律所合作申请',
					data  :[
						{
							name : '律所名称',
							value : '',
							test : false,
							isTest : true,
							testCont : '*此处不可空白 *英文或中文',
							testFuntion : function(){
								alert(1);
							}
						},
						{
							name : '联系人姓名',
							value : '',
							test : false,
							isTest : true,
							testCont : '*此处不可空白 *英文或中文',
							testFuntion : function(){
								alert(2);
							}
						},
						{
							name : '联系人Email',
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
							isTest : false,
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
	.organizeCoo {
	    box-sizing: border-box;
	    width: 612px;
	}
	.organizeCoo .organizeCooContent {
	    box-sizing: border-box;
	    width: 100%;
	    overflow: auto;
	    height: 440px;
	}
	.organizeCoo .organizeCooContent img {
	    box-sizing: border-box;
	    width: 612px;
	    height: 243px;
	    margin: 40px 0 58px 0;
	}
	.organizeCoo .organizeCooContent .organizeCooBtn {
	    box-sizing: border-box;
	    display: block;
	    width: 284px;
	    height: 70px;
	    margin: 0 auto;
	    text-align: center;
	    background: url("../../img/lsgrbtn.png") no-repeat center;
	    line-height: 54px;
	    color: #fff;
	    font-size: 18px;
	    cursor: pointer;
	    text-indent: -999em;
	}
</style>