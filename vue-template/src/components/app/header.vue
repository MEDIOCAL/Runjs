<template>
	<div class="header">
	    <a href="" class="djbtn-navber" @click="sldeShow" >
	        <code class="bcol-white"></code>
	        <code class="bcol-white mt5"></code>
	        <code class="bcol-white mt5"></code>
	    </a>
	    <div class='swapper'>
	        <div class='menu-list-li nav-btn' v-bind:class='{show : obj.isShow}'   @mouseenter='listShow(true)' @mouseleave='listShow(false)' >
	            <a href="javascript:void(0)">主页</a>
	            <code class="menu-list-code"></code>
	            <div class='son-menu-list'>
	                <ul class="son-menu-listul01" v-if='loginStatus'>
	                    <li class="listul-li">
	                        <a href="http://www.zfwx.com/wxqt/index.do" target="_blank" class="listul-a">律师学院</a>
	                    </li>
	                    <li class="listul-li">
	                        <a href="http://sfjd.zfwx.com/wxqt/index.do" target="_blank" class="listul-a">司法鉴定</a>
	                    </li>
	                    <li class="listul-li">
	                        <a href="http://gz.zfwx.com/wxqt/index.do"  target="_blank" class="listul-a">公证学院</a>
	                    </li>
	                    <li class="listul-li">
	                        <a href="http://jr.zfwx.com/wxqt/index.do" target="_blank" class="listul-a">金融学院</a>
	                    </li>
	                    <li class="listul-li">
	                        <a href="http://qy.zfwx.com/wxqt/index.do" target="_blank" class="listul-a">企业学院</a>
	                    </li>
	                    <li class="listul-li">
	                        <a href="http://sqzy.zfwx.com/wxqt/index.do" target="_blank" class="listul-a">申请执业</a>
	                    </li>
	                    <li class="listul-li">
	                        <a href="http://sfks.zfwx.com/wxqt/index.do"  target="_blank" class="listul-a">司法考试</a>
	                    </li>
	                    <li class="listul-li">
	                        <a href="javascript:void(0);" class="listul-a pray">高等院校</a>
	                    </li>
	                    <li class="listul-li">
	                        <a href="http://zffw.zfwx.com/wxqt/index.do"  target="_blank" class="listul-a">政府法务</a>
	                    </li>
	                    <li class="listul-li">
	                        <a href="javascript:void(0);" class="listul-a pray">公检法纪</a>
	                    </li>
	                    <li class="listul-li">
	                        <a href="http://jmfw.zfwx.com/wxqt/index.do"  target="_blank" class="listul-a">居民法务</a>
	                    </li>
	                    <li class="listul-li">
	                        <a href="http://cmfw.zfwx.com/wxqt/index.do"  target="_blank" class="listul-a">村民法务</a>
	                    </li>
	                    <li class="listul-li">
	                        <a href="javascript:void(0);" class="listul-a pray">事业社团</a>
	                    </li>
	                    <li class="listul-li">
	                        <a href="javascript:void(0);" class="listul-a pray">仲裁学院</a>
	                    </li>
	                    <li class="listul-li">
	                        <a href="http://jcfg.zfwx.com/wxqt/index.do"  target="_blank" class="listul-a">基层法工</a>
	                    </li>
	                </ul>
	                <ul class="son-menu-listul01" v-else>
	                    <li class="listul-li">
	                        <a href="http://www.zfwx.com/wxqt" target="_blank" class="listul-a">律师学院</a>
	                    </li>
	                    <li class="listul-li">
	                        <a href="http://sfjd.zfwx.com/wxqt" target="_blank" class="listul-a">司法鉴定</a>
	                    </li>
	                    <li class="listul-li">
	                        <a href="http://gz.zfwx.com/wxqt"  target="_blank" class="listul-a">公证学院</a>
	                    </li>
	                    <li class="listul-li">
	                        <a href="http://jr.zfwx.com/wxqt" target="_blank" class="listul-a">金融学院</a>
	                    </li>
	                    <li class="listul-li">
	                        <a href="http://qy.zfwx.com/wxqt" target="_blank" class="listul-a">企业学院</a>
	                    </li>
	                    <li class="listul-li">
	                        <a href="http://sqzy.zfwx.com/wxqt" target="_blank" class="listul-a">申请执业</a>
	                    </li>
	                    <li class="listul-li">
	                        <a href="http://sfks.zfwx.com/wxqt"  target="_blank" class="listul-a">司法考试</a>
	                    </li>
	                    <li class="listul-li">
	                        <a href="javascript:void(0);" class="listul-a pray">高等院校</a>
	                    </li>
	                    <li class="listul-li">
	                        <a href="http://zffw.zfwx.com/wxqt"  target="_blank" class="listul-a">政府法务</a>
	                    </li>
	                    <li class="listul-li">
	                        <a href="javascript:void(0);" class="listul-a pray">公检法纪</a>
	                    </li>
	                    <li class="listul-li">
	                        <a href="http://jmfw.zfwx.com/wxqt"  target="_blank" class="listul-a">居民法务</a>
	                    </li>
	                    <li class="listul-li">
	                        <a href="http://cmfw.zfwx.com/wxqt"  target="_blank" class="listul-a">村民法务</a>
	                    </li>
	                    <li class="listul-li">
	                        <a href="javascript:void(0);" class="listul-a pray">事业社团</a>
	                    </li>
	                    <li class="listul-li">
	                        <a href="javascript:void(0);" class="listul-a pray">仲裁学院</a>
	                    </li>
	                    <li class="listul-li">
	                        <a href="http://jcfg.zfwx.com/wxqt"  target="_blank" class="listul-a">基层法工</a>
	                    </li>
	                </ul>
	            </div>
	        </div>
	        <a href="http://cas.zfwx.com/login?service=http://www.zfwx.com/wxgr/myRoute.do?params=tingke" target='blank' class='nav-btn' v-if='!loginStatus'>听课</a>
	        <a href="http://www.zfwx.com/wxgr/index.do?#/tingke" target='blank' class='nav-btn' v-else>听课</a>
	        <a href="http://www.zfwx.com/allUser/school_login_success.jsp?redirect=http://www.zfwx.com/joinus.jsp" target='blank' class='nav-btn'>招聘</a>

	        <div class='menu-ri'>
	            <div class='login-center'  @mouseenter='cenShow(true)' @mouseleave='cenShow(false)' v-bind:class='{toshow : obj.toShow}'>
	                <a v-bind:href="'http://cas.zfwx.com/login?service=http://www.zfwx.com/wxqt/'+getPath+'Index.do'" v-if='!loginStatus'>登录</a>
	                <a v-bind:href="'http://'+requirePath+'/wxgr/index.do'" class='myconcen' style='margin:auto;'  v-else='loginStatus'>我的中心</a>
	                <div class='concenList'  v-if='loginStatus'>
	                    <ul>
	                        <li> <a href=""  v-bind:title='userInfo'>{{userInfo}}</a></li>
	                        <li> <a href="http://www.zfwx.com/wxgr/index.do?#/tingke">我的学堂</a></li>
	                        <li> <a href="http://www.zfwx.com/wxqt/logout">退出</a></li>
	                    </ul>    
	                </div>
	            </div>
	            <a href="http://base.zfwx.com/register.do?service=http://www.zfwx.com/wxqt" v-if='!loginStatus'>注册</a>
	            <a href="http://www.zfwx.com/phone/down/iphone.html" class='icon-phone'>手机版</a>
	        </div>
	    </div>
	</div>
</template>
<script>
	import axios from 'axios';
	import {headerApi} from '../../../api/index.js';
	export default {
		data : function(){ 
			return {
				obj : {
                	"isShow" : false,
                	"toShow" : false
            	},
            	requirePath : window.location.host
            }
		},
		computed : {
			loginStatus() {
				return this.$store.getters.getLoginState;
			},
			userInfo() {
				return this.$store.getters.getUserInfo;
			},
			getPath() {
				return this.$store.getters.getPath;
			}
		},
		mounted : function(){
			let getUserInfo = headerApi.getUserInfo;

			axios[getUserInfo.method](getUserInfo.url,getUserInfo.obj,{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
			.then((response) => {
				if(response.data.code == '104'){
					this.$store.dispatch('signOut');	
				}else{
					this.$store.dispatch('isLogin');
				}
				this.$store.dispatch('setUserInfo',response.data.result);	
			})
			.catch((error) =>{
				console.log(error);
			})
			this.watchPath();
		},
		methods : {
			listShow : function (b){
				this.obj.isShow = b;
			},
			cenShow  : function(b) {
				this.obj.toShow = b;
			},
			sldeShow : function(){

			},
			watchPath : function(){
				let path = this.$route.path;
				this.$store.dispatch('setPath',path);
			}
		}
	}
</script>

<style lang='sass'>
/*头部 ------------ start*/
 .header{
    width:100%;
    font-family: '微软雅黑','黑体','宋体';
    background:#000;
    font-size:14px;
    position: relative;
 }
 .header .mt5{
    margin-top:5px;
 }
 .header a{
    color:#c3c3c3;
 }
 .header a:hover{
    color:#fff;
 }
 .header .djtop {
    height: 30px;
    position: relative;
    width: 100%;
    z-index: 2;
 }
 .header .bcol-back {
    background: #000;
 }
 .header .djbtn-navber {
    width: 24px;
    position: absolute;
    left: 2%;
    padding: 7px 0 6px;
    z-index: 9999;
 }
 .header .djbtn-navber code {
    display: block;
    font-size: 0;
    height: 2px;
 }
 .header .bcol-white {
    background: #fff;
 }

 .header .swapper{
    width:1198px;
    height:30px;
    line-height:30px;
    color:#fff;
    margin:0 auto;
    position:relative;
 }
 .header .menu-list-li{
    float:left;
    display:inline-block;
    width:55px;
 }
 .header .menu-list-code{
    float:right;
    width:10px;
    height:6px;
    margin:14px 10px 0 5px;
    background:url('../../img/menu_son.png') no-repeat;
 }
 .header .nav-btn{
    padding:0px 9px 0px 16px;
    cursor:pointer;
    position:relative;
 }
 .header .show{
    background:#eee;
 }
 .header .show a{
    color:#000;
 }
 .header .son-menu-list{
    position:absolute;
    left:0px;
    top:30px;
    width:243px;
    background:#eee;
    padding:3px 0px;
    display:none;
    z-index:100;
 }
 .header .show .son-menu-list{
    position:absolute;
    left:0px;
    top:30px;
    width:243px;
    background:#eee;
    padding:3px 0px;
    display:block;
    z-index:100;
 }
 .header .son-menu-list .pray{
    color:#999;
 }
 .header .listul-li{
    width:80px;
    height:30px;
    line-height:30px;
    float:left;
    font-size:12px;
    text-align: center;
    border-right: 1px solid #aaa;
 }
 .header .brno{
     border-right: 0 none;
 }
  .header .listul-li a{
    color:#000;
  }
 .header .menu-ri{
    float:right;
    display:inline-block;
 }
 .header .login-center{
    display: inline-block;
    position:relative;
    padding-right:20px;
 }
 .header .menu-ri a{
    margin-left:20px;
 }
 .header .menu-ri a:hover{
    color:#fff;
 }
 .header .icon-phone{
   padding-left: 20px;
   background:url('../../img/icon_djphone.png') no-repeat 5px 3px;
 }
 .header .myconcen{
    padding:0 20px 0 10px;
    background :url('../../img/menu_son.png') no-repeat 71px 8px;
 }
 .header .concenList{
    position:absolute;
    left:0px;
    top:30px;
    background:#eee;
    z-index:100;
    display:none;
 }
 .header .concenList li{
    width:74px;
    text-align: left;
    font-size:12px;
    padding-left:12px;
    white-space: nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
 .header .concenList a{
    margin:auto;
     color:#000;
  }
 .header .toshow {
    background:#eee;
 }
  .header .toshow  a{
    color:#333
  }
 .header .toshow  a:hover{
    color:#333;
  }
 .header .toshow .myconcen{
    padding:0 20px 0 10px; 
    color:#000;
 }
 .header .toshow .concenList{
    position:absolute;
    left:0px;
    top:30px;
    background:#eee;
    z-index:100;
    display:block;
 }
/*头部 ------------ end*/

</style>