<template>
	<div class='dianke-submit'>
		<h3 class='titles'>我要听 <a href="javascript:void(0)" @click='closer()'  class='closer'>×</a></h3>
		<div class='shenqingList'>
			<p style='margin:10px 0px;color:#222;'>请留下以下信息：</p>
			<div class='til-cont' style='margin-top:20px;'>
				<input type='text' v-model='submit.realName' id='lx-name' @blur='testYourName()' placeholder='您的姓名？'/>
				<div class='notNull' v-show='test.yourName'>
				   <span class='alert-txt'>*此处不可空白 *英文或中文</span>
				   <i class='sanjiao'></i>	
				   <i class='sanjiao1'></i>	
				   <i class='sanjiao2'></i>	
				</div>
			</div>
			<div class='til-cont'>
				<input type='text' v-model='submit.phoneNum' id='lx-phone' @blur='testPhone()'  placeholder='您的手机号？'/>
				<div class='notNull' v-show='test.phone'>
				   <span class='alert-txt'>*此处不可空白 *无效电话号码</span>
				   <i class='sanjiao'></i>	
				   <i class='sanjiao1'></i>	
				   <i class='sanjiao2'></i>	
				</div>
			</div>
			<div class='til-cont'>
				<input type='text' v-model='submit.danwei' id='lx-phone'  placeholder='您的单位和职称？'/>
			</div>
			<div class='til-cont'>
				<input type='text' v-model='submit.conent' id='lx-user' @blur='testUser()' placeholder='课程内容，学习目的，师资要求，心理价位等...'/>
				<div class='notNull' v-show='test.user'>
				   <span class='alert-txt'>*此处不可空白 *应英文或中文</span>
				   <i class='sanjiao'></i>	
				   <i class='sanjiao1'></i>	
				   <i class='sanjiao2'></i>	
				</div>
			</div>
			<p class='submit'>
				<a href="javascript:void(0)" @click='submitData' style='background:#0064cd;color:#fff;'>提交</a>
			</p>
		</div>
	</div>
</template>
<script>
	import {wantLisApi} from '../../api/index.js';
	import axios from 'axios';
    import jsonp from 'jsonp';
	export default {
		data : function(){
			return {
				submit : {
					realName : '',
					phoneNum : '',
					danwei   : '',
					conent   : ''
				},
				test  : {
					yourName : '',
					phone    : '',
					user     : ''
				}
			}
		},
		methods : {
			closer : function(){
				this.$store.dispatch('setDianke',false);
			},
			testYourName : function(){
				var re = /^[a-zA-Z]+$|^[\u4E00-\u9FA5]+$/;
                if (!re.test(this.submit.realName)|| !this.submit.realName) {
                    this.test.yourName = true;
                }else {
                    this.test.yourName = false;
                }
			},
			testPhone : function(){
				if(!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(this.submit.phoneNum))){ 
                  this.test.phone = true;
                }else{
                  this.test.phone = false;  
                } 
			},
			testUser : function(){
				var re = /^[\u4e00-\u9fa5a-zA-Z,.?!]+$/;
                if (!re.test(this.submit.conent)|| !this.submit.conent) {
                    this.test.user = true;
                }else {
                    this.test.user = false;
                }
			},
			submitData : function(){
				this.testPhone();
                this.testUser();
                this.testYourName();
                if(this.test.user){
                    alert('内容应为英文或者中文');
                    return;
                }else if(this.test.yourName){
                    alert('姓名应为英文或者中文');
                    return;
                }else if(this.test.phone){
                    alert('手机号错误');
                    return;
                }
      //           axios[wantLisApi.method](wantLisApi.url,{
      //           	params : {
      //           		realName:this.submit.realName,
						// mobile:this.submit.phoneNum,
						// note:this.submit.danwei,
						// content:this.conent,
						// title:'11',
						// teacher:'11'
      //           	}
      //           }).then( (response) => {
      //           	console.log(response)
      //           	if(response.data.status == 'success'){
      //           		alert(提交成功,我们最迟在两周以内给您答复)
      //           	}
      //           }).catch((response)=>{
      //           	console.log(response);
      //           });
                function jsonpCallback(data){
                    return data;
                }
                jsonp('http://base.zfwx.com/wydk.do?jsonpCallback=jsonpCallback&realName='+this.submit.realName+'&mobile='+this.submit.phoneNum+'&note='+this.submit.danwei+'&content='+this.submit.conent+'&title=11&teacher=11',null,function (err, data) {
                  alert(提交成功,我们最迟在两周以内给您答复)
                });
                this.submit = {
					realName : '',
					phoneNum : '',
					danwei   : '',
					conent   : ''
				}
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
	.dianke-submit {
	    background: #fff;
	    width: 578px;
	    border: 1px solid #999;
	    overflow: hidden;
	    position:fixed;
	    left: 50%;
	    top: 48%;
	    margin-top: -255px;
	    margin-left: -285px;
	    z-index:9999;
	}
.dianke-submit .titles{
    height:40px;
    line-height:40px;
    color:#404040;
    font-size:18px;
    font-weight: bold;
    padding:5px 15px 5px 15px;
    width:548px;
    border-bottom:1px solid #ccc;
    position:relative;
}
.dianke-submit .shenqingList{
    width:478px;
    padding:10px 50px 50px 50px;
    color:#777;
}
.dianke-submit .til-name{
    margin-bottom:5px;
}
.dianke-submit .til-cont{
    width:478px;
    height:40px;
    line-height:40px;
    position:relative;
    margin-bottom:30px;
}
.dianke-submit .til-cont input{
    width:458px;
    height:40px;
    padding:0 10px;
    line-height:40px;
    border:1px solid #ccc;
}
.dianke-submit .notNull{
    width:92px;
    height:42px;
    padding:2px;
    border:1px solid #ccc;
    background:#fff;
    position:absolute;
    right:-5px;
    top:-56px;
    border-radius:3px;
    -webkit-border-radius:3px;
    -moz-border-radius:3px;
    -ms-border-radius:3px;
}
.dianke-submit .alert-txt{
    display:block;
    width:86px;
    height:36px;
    line-height:18px;
    position:absolute;
    top:2px;
    left:2px;
    background:#ee0101;
    color:#fff;
    z-index:100;
    font-size:12px;
    padding:3px;
     border-radius:3px;
    -webkit-border-radius:3px;
    -moz-border-radius:3px;
    -ms-border-radius:3px;
}
.dianke-submit .sanjiao{
    position:absolute;
    left:7px;
    bottom:-11px;
    border:7px solid #ee0101;
    border-left-color:transparent;
    border-right-color:transparent;
    border-bottom-color:transparent;
    z-index:99;

}
.dianke-submit .sanjiao1{
    position:absolute;
    left:5px;
    bottom:-15px;
    border:9px solid #fff;
    border-left-color:transparent;
    border-right-color:transparent;
    border-bottom-color:transparent;
    z-index:98;
}
.dianke-submit .sanjiao2{
    position:absolute;
    left:5px;
    bottom:-16px;
    border:9px solid #ccc;
    border-left-color:transparent;
    border-right-color:transparent;
    border-bottom-color:transparent;
    z-index:97;
}
.dianke-submit .submit{
    height:45px;
}
.dianke-submit .submit a{
    display:block;
    width:100%;
    height:45px;
    line-height:45px;
    text-align: center;
    border-radius:3px;
    -webkit-border-radius:3px;
    -moz-border-radius:3px;
    -ms-border-radius:3px;
    overflow:hidden;
    margin:auto;
}
.dianke-submit .closer{
    position: absolute;
    right:10px;
    top:5px;
    border: 0 none;
    color:#ccc;
}
.dianke-submit .closer:hover{
	color:#ccc;
}
</style>