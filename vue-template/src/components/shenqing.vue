<template>
	<div class='shenqing' v-show='colseShenqing'>
		<div class='lvxie-submit'>
		 	<h3 class='titles'>{{shenqing.title}} <i @click='closer()' style='position:absolute;right:10px;top:5px;font-style:normal;cursor:pointer;'>×</i></h3>
			<div class='shenqingList'> 
				<!-- <p class='til-name'>律所名称：</p> -->
				<div class='til-cont' v-for='d in shenqing.data'>
					<input type='text' v-model='d.value' id='lx-name' @blur='d.testFuntion' v-bind:placeholder='d.name'/>
					<div class='notNull' v-show='d.test'>
					   <span class='alert-txt'>{{d.testCont}}</span>
					   <i class='sanjiao'></i>	
					   <i class='sanjiao1'></i>	
					   <i class='sanjiao2'></i>	
					</div>
				</div>	
				<p class='submit'>
					<a href="javascript:void(0)" @click='lsSubmit()' style='background:#0064cd;color:#fff;'>提交</a>
				</p>
			</div>
		</div>
	</div>
	
</template>

<script>
	export	default{
		computed : {
			colseShenqing(){
				return this.$store.getters.getCoop;
			},
			shenqing(){
				return this.$store.getters.getShenQingInfo;
			}
		},
		methods : {
			closer : function(){
				this.$store.dispatch('setCoop',false);
			},
			lsSubmit : function(){

			}
		}
	}
</script>

<style lang='sass'>
	.shenqing {
	    width: 500px;
	    z-index: 9999;
	    position: fixed;
	    left: 50%;
	    top: 48%;
	    margin-top: -255px;
	    margin-left: -285px;
	}
	.lvxie-submit {
	    width: 540px;
	    border: 1px solid #ccc;
	    overflow: hidden;
	}
	.lvxie-submit .titles {
	    background: #fff;
	    height: 30px;
	    line-height: 30px;
	    color: #404040;
	    font-size: 16px;
	    font-weight: bold;
	    padding: 5px 15px 5px 15px;
	    width: 510px;
	    border-bottom: 1px solid #eee;
	    position: relative;
	}
	.lvxie-submit .shenqingList {
	    width: 460px;
	    padding: 10px 40px 10px 40px;
	    color: #777;
	    background: #fff;
	}
	.lvxie-submit .til-cont {
	    width: 460px;
	    height: 40px;
	    line-height: 40px;
	    position: relative;
	    margin-bottom: 15px;
	    background: #fff;
	}
	.lvxie-submit .til-cont input {
	    width: 450px;
	    height: 38px;
	    padding-left: 10px;
	    line-height: 38px;
	    border: 1px solid #ccc;
	    font-family: '微软雅黑';
	}
	.lvxie-submit .notNull {
	    width: 92px;
	    height: 42px;
	    padding: 2px;
	    border: 1px solid #ccc;
	    background: #fff;
	    position: absolute;
	    right: -5px;
	    top: -53px;
	    border-radius: 3px;
	    -webkit-border-radius: 3px;
	    -moz-border-radius: 3px;
	    -ms-border-radius: 3px;
	}
	.lvxie-submit .alert-txt {
	    display: block;
	    width: 86px;
	    height: 36px;
	    line-height: 18px;
	    position: absolute;
	    top: 2px;
	    left: 2px;
	    background: #ee0101;
	    color: #fff;
	    z-index: 100;
	    font-size: 12px;
	    padding: 3px;
	    border-radius: 3px;
	    -webkit-border-radius: 3px;
	    -moz-border-radius: 3px;
	    -ms-border-radius: 3px;
	}
	.lvxie-submit .sanjiao {
	    position: absolute;
	    left: 7px;
	    bottom: -11px;
	    border: 7px solid #ee0101;
	    border-left-color: transparent;
	    border-right-color: transparent;
	    border-bottom-color: transparent;
	    z-index: 99;
	}
	.lvxie-submit .sanjiao1 {
	    position: absolute;
	    left: 5px;
	    bottom: -15px;
	    border: 9px solid #fff;
	    border-left-color: transparent;
	    border-right-color: transparent;
	    border-bottom-color: transparent;
	    z-index: 98;
	}
	.lvxie-submit .sanjiao2 {
	    position: absolute;
	    left: 5px;
	    bottom: -16px;
	    border: 9px solid #ccc;
	    border-left-color: transparent;
	    border-right-color: transparent;
	    border-bottom-color: transparent;
	    z-index: 97;
	}
	.lvxie-submit .submit {
	    height: 31px;
	    margin-bottom: 20px;
	}
	.lvxie-submit .submit a {
	    float: right;
	    display: block;
	    width: 100%;
	    height: 40px;
	    line-height: 40px;
	    text-align: center;
	    overflow: hidden;
	    /* margin-right: 10px; */
	    font-size: 14px;
	    /* margin-bottom: 20px; */
	    color: #666;
	    background: #0064cd;
    	color: #fff;
	}
	
</style>