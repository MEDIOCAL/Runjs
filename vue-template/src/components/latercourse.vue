<template>
	<div>
		<div class='title'>
			<div class='line_shu fl'></div>
			<span class='title_show fl'>最新课程</span>
			<ul class='fr title_link_list'>
				<li><a href="javascript:void(0)" @click='getOtherData()'>全部</a></li>
				<span class="split_icon fl">/</span>
				<li><a href="javascript:void(0)" @click='getOtherData(1)'>合同事务</a></li>
			</ul>
		</div>
		<div class="latestCourse">
		    <i class="left newsPrevious previous" v-bind:class="{disabled:!lunbo.ifPre}"></i>
		    <i class="right newsNext next" v-bind:class="{disabled:!lunbo.ifNext}"  @click="addlatestData()"></i>
		    <div class="latestCourse_list">
		        <dd class="latestCourseContainer">
		            <dl class="fl" v-for='(courseList,i) in latestCourse' v-bind:class='(i+1)'>
		                <ul>
		                    <li class="fl" v-for='(d,index) in courseList' v-bind:class='{"last":(index+1)%5==0}'>
		                        <a class='img-link' v-bind:href="'/schoolLessonDetail.do?courseId='+d.courseId" target='blank' v-bind:title="d.csName">
		                        	<img v-bind:src="'http://image.zfwx.com'+d.csImg | toArray(',')" alt="" v-show='!loginStatus'>
		                        </a>
		                        <a class='img-link' v-bind:href="'http://www.zfwx.com/allUser/school_login_success.jsp?redirect=http://www.zfwx.com/schoolLessonDetail.do?courseId='+d.courseId" target='blank' v-bind:title="d.csName">
		                        	<img v-bind:src="'http://image.zfwx.com'+d.csImg | toArray(',')" alt="" v-show='loginStatus'>
		                        </a>
		                        <i class="tuijian" v-show='d.csTjOrder'></i>
		                        <div class="courseInfo">
		                            <a v-bind:href="'/schoolLessonDetail.do?courseId='+d.courseId"  target='blank' class="courseName" v-bind:title="d.csName"  v-show='!loginStatus'>{{d.csName}}</a>
		                            <a v-bind:href="'http://www.zfwx.com/allUser/school_login_success.jsp?redirect=http://www.zfwx.com/schoolLessonDetail.do?courseId='+d.courseId" target='blank' class="courseName" v-bind:title="d.csName" v-show='loginStatus'>{{d.csName}}</a>
		                            <span class="fl">讲师： <strong style='font-weight:normal;color:#666'>{{d.tchNames}}</strong></span>
		                            <span class="fr">时长 : <strong style='font-weight:normal;color:#666'>{{d.csHour}}分钟</strong></span>
		                        </div>
		                    </li>
		                </ul>
		            </dl>
		            
		        </dd>
		    </div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios';
	import {searchApi, laterCourse, tagCourse} from '../../api/index.js';
	import $ from 'jquery';
	export default {
		data : function(){
			return {
				lunbo : {
					ifPre  : false,
					ifNext : true,
					index  : 1
				},
				latestCourse : [],
				currentPage : 2,
				maxPage : 1,
				lateCouType : ''
			}
		},
		computed : {
			loginStatus() {
				return this.$store.getters.getLoginState;
			}
		},
		methods : {
			getOtherData : function(n){
				this.lateCouType = n;
				let getData = searchApi.getNewsCourse;
				if(!n){
					axios[getData.method](getData.url,{params : getData.params}).then( (response) => {
	                    $('.latestCourseContainer').animate({'left':'0px'},300);
	                    this.lunbo.ifPre = false;
	                    this.lunbo.ifNext=true;
	                    this.lunbo.index = 1;
	                    this.latestCourse = [];
	                    this.currentPage = 2;
	                    this.lateCouType = n;
	                    this.maxPage = Math.ceil(response.data.result.totalCount/10);
	                    this.latestCourse[0] = response.data.result.data.slice(0,10);
	                    // $(e.target).css("color","#4374ff").parent().siblings().find('a').css("color","#959595");
	                    if(this.maxPage < 2){
	                      this.lunbo.ifNext=false;
	                      return;
	                    }
	                    this.latestCourse[1] = response.data.result.data.slice(10,20); 
		                 
					});
					return;
				}
				axios[tagCourse.method](tagCourse.url).then( (response) => {
					if(response.data.result.data.length<1){
	                    this.$store.dispatch('setDianke',true);
	                }else{
	                    $('.latestCourseContainer').animate({'left':'0px'},300);
	                    this.lunbo.ifPre = false;
	                    this.lunbo.ifNext=true;
	                    this.lunbo.index = 1;
	                    this.latestCourse = [];
	                    this.currentPage = 2;
	                    this.lateCouType = n;
	                    this.maxPage = Math.ceil(response.data.result.totalCount/10);
	                    this.latestCourse[0] = response.data.result.data.slice(0,10);
	                    // $(e.target).css("color","#4374ff").parent().siblings().find('a').css("color","#959595");
	                    if(this.maxPage < 2){
	                      this.lunbo.ifNext=false;
	                      return;
	                    }
	                    this.latestCourse[1] = response.data.result.data.slice(10,20); 
	                 }
				});
			},
			addlatestData : function(){
				if(!this.lateCouType){
	              if(this.currentPage < this.maxPage){
	                  this.currentPage++;
	               	  axios[laterCourse.method](laterCourse.url).then((response)=>{
	               	  		this.latestCourse[this.currentPage-1] = response.data.result.data;
	               	  });
	              }
	            }else{
	              if(this.currentPage < this.maxPage){
	                  this.currentPage++;
	               	  axios[laterCourse.method](laterCourse.url).then((response)=>{
	               	  		this.latestCourse[this.currentPage-1] = response.data.result.data;
	               	  });
	              }
	            }
			}
		},
		created : function(){
			let getData = searchApi.getNewsCourse;
			axios[getData.method](getData.url,{params : getData.params}).then( (response)=>{
				this.latestCourse = ['a','b','c']
				this.maxPage = Math.ceil(response.data.result.totalCount/10);
                this.latestCourse[0] = response.data.result.data.slice(0,10);
                if(this.maxPage < 2){
                  this.lunbo.ifNext=false;
                  return;
                }
                this.latestCourse[1] = response.data.result.data.slice(10,20); 
			});
		},
		mounted : function(){
			let $newsNext     = $(this.$el).find(".newsNext");
            let $newsPrevious = $(this.$el).find(".newsPrevious");
       
            let $courseContainer = $(this.$el).find(".latestCourseContainer");         
            let that = this;

			$newsNext.on("click",function(){
                if($(this).hasClass("disabled")){
                    return false;
                }
                $courseContainer.animate({'left':'-'+that.lunbo.index*1200+'px'},500,'swing',function(){
                    that.lunbo.index++;
                    var flag1= that.maxPage;
                    if(that.lunbo.index>1&&that.lunbo.index<flag1){
                        that.lunbo.ifPre=true;
                        that.lunbo.ifNext=true;
                    }
                    if(that.lunbo.index==flag1){
                        that.lunbo.ifNext=false;
                        that.lunbo.ifPre=true;   
                    }
                });
            })
            $newsPrevious.on("click",function(){ 
                if($(this).hasClass("disabled")){
                    return false;
                }
                $courseContainer.animate({'left':'-'+((that.lunbo.index-2)*1200)+'px'},500,'swing',function(){
                    var flag1=that.maxPage;;
                    that.lunbo.index--;
                    if(that.lunbo.index>1&&that.lunbo.index<flag1){
                        that.lunbo.ifPre=true;
                        that.lunbo.ifNext=true;
                    }
                    if(that.lunbo.index==1){
                        that.lunbo.ifPre=false;
                        that.lunbo.ifNext=true;
                    }
                });
                
            });
		}
	}
</script>
<style lang='sass'>
	.fl{float:left}
	.fr{float:right}
	.line_shu{
		width:3px;
		height:26px;
		background: url('../img/icons.png') no-repeat center;
		background-position:-172px -23px;
		box-sizing: border-box
	}
	.title_show{
		display:block;
		margin:0 14px 0 15px;
		color:#313131;
		font-size:24px;
		line-height:26px;
		box-sizing: border-box;
	}
	ul.title_link_list{color:#959595;box-sizing: border-box;margin-right:1px;margin-top:11px;font-size:14px;}
	ul.title_link_list a{color:#959595;text-decoration: none;box-sizing: border-box;}
	ul.title_link_list a:hover{color:#0756e3;}
	ul span.split_icon {
	    margin: 0 10px;
	    box-sizing: border-box;
	}
	.title {
	    width: 100%;
	    height: 26px;
	    margin-bottom: 18px;
	    box-sizing: border-box;
	    margin-top: 50px;
	}
	.title ul li,.title ul span{
		float:left;
	}
	/*最新课程*/
	.latestCourse{position:relative;width:100%;margin:28px 0px;box-sizing: border-box}
	.latestCourse .latestCourseContainer{width:100000px;height:462px;position: absolute;z-index:1;box-sizing: border-box}
	.latestCourse .latestCourseContainer dl{width:1200px;height:462px;box-sizing: border-box}
	.latestCourse .latestCourseContainer ul{clear:both;box-sizing: border-box;height:462px;}
	ul span.split_icon{margin:0 10px;;box-sizing: border-box}
	.latestCourse_list{position:relative;width:100%;height:470px;overflow: hidden;box-sizing: border-box}
	.latestCourse_list ul{overflow: hidden;box-sizing: border-box}
	.latestCourse .left{position: absolute;left:-10px;top:208px;width:30px;height:30px;color:#fff;background:url("../img/icons.png") no-repeat center #7d7d7d;background-position:-66px -22px; z-index: 99;cursor:pointer;box-sizing: border-box}
	.latestCourse .left.disabled{background-color:lightgray;box-sizing: border-box}
	.latestCourse .right{box-sizing: border-box;position: absolute;right:-10px;top:208px;width:30px;height:30px;color:#fff;background:url("../img/icons.png") no-repeat center #7d7d7d;background-position:-111px -18px; z-index: 99;cursor:pointer}
	.latestCourse .right.disabled{box-sizing: border-box;background-color:lightgray;}
	.latestCourse_list li{box-sizing: border-box;position: relative;width:230px;height:216px;border:1px solid #e8e8e8;margin:0 12px 15px 0;}
	.latestCourse_list li .img-link{width:100%;display:block;height:145px;position:absolute;top:0px;}
	.latestCourse_list li:hover .courseInfo{background:#f4f4f4;}
	.latestCourse_list li:hover .courseInfo a{color:#089ee0;}
	.latestCourse_list li.last{box-sizing: border-box;margin:0 0 15px 0;}
	.latestCourse_list li img{box-sizing: border-box;position:absolute;top:0;left:0;width:228px;height:145px;}
	.latestCourse_list li .tuijian{box-sizing: border-box;display:block;width:36px;height:22px;position:absolute;top:0;right:10px;background: url("../img/icons.png") no-repeat center;background-position:-157px -122px; }
	.latestCourse_list li .courseInfo{box-sizing: border-box;position:absolute;bottom:1px;left:1px;width:227px;height:70px;padding:10px;background-color: #fff}
	.latestCourse_list li .courseInfo .courseName{box-sizing: border-box;display:block;height:21px;font-size:16px;color:#000;margin-bottom:10px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis}
	.latestCourse_list li .courseInfo .courseName:hover{color:#089ee0;}
	.latestCourse_list li .courseInfo span{color:#959595;font-size:12px;white-space: nowrap;overflow: hidden;text-overflow:ellipsis;}
	.latestCourse_list li .courseInfo span.fr{margin-right: 32px;}
	.latestCourse_list .titles{height:20px;line-height:20px;font-size:20px;font-weight:bolder;margin-bottom:15px;}
	.searchCourseList .home {
	    font-size:14px;
	    font-weight: normal;
	    padding:5px 0px 5px 30px;
	    background:url(../img/search_home.png) no-repeat 2px 8px;
	}

	/*课程列表 左右*/
	.course-list .left{line-height:25px;text-align:center;position: absolute;right:48px;left:auto;top:4px;width:25px;height:25px; z-index: 99;color:#089ee0;cursor:pointer;background:#fff;border-radius: 50%;border:1px solid #089ee0;}
	.course-list .left.disabled{border-color:#999;color:#999;background-color:#fff;}
	.course-list .right{line-height:25px;text-align:center;background:#fff;border-radius: 50%;position: absolute;right:10px;left:auto;top:4px;width:25px;height:25px;color:#999;z-index: 99;cursor:pointer;color:#089ee0;border:1px solid #089ee0;}
	.course-list .right.disabled{border-color:#999;color:#999;background-color:#fff;}

</style>