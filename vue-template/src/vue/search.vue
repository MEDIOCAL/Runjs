<template>
	<div class='searchCourseList'>
	    <h3 class='home'><span @click='reloadThis' style='cursor:pointer;'>{{homeName}}</span> - <span>搜索结果</span></h3>
	    <div class="latestCourse course-list" v-show='newsCourseList.length>0'>
	        <i class="left newsPrevious" v-bind:class="{disabled:!searchData.newsIfPre}"><</i>
	        <i class="right  newsNext" v-bind:class="{disabled:!searchData.newsIfNext}" @click='addNewsCourse()'>></i>
	        <div class="latestCourse_list" style='height:483px;'>
	            <h3 class='titles'>最新课程</h3>
	            <dd class="latestCourseContainer1" style='width:12000px;height:479px;position:absolute;top:35px;left:0px;'>  
	                <dl class="fl"  v-for='courseList in newsCourseList' v-bind:class='($index+1)' style='width:1198px;'>
	                    <ul class="">
	                        <li class="fl" v-for='(i,index) in courseList' v-bind:class='{last:(index+1)%5==0}'>
	                            <a v-bind:href="'/schoolLessonDetail.do?courseId='+i.courseId" ng-bind:title="i.csName">
	                            	<img v-bind:src="'http://image.zfwx.com'+i.csImg.split(',')[0]" >
	                            </a>
	                            <i class="tuijian" v-if='i.csTjOrder'></i>
	                            <div class="courseInfo">
	                                <a v-bind:href="'/schoolLessonDetail.do?courseId='+i.courseId" class="courseName" ng-bind:title="i.csName">{{i.csName}}</a>
	                                <span class="fl">讲师：<strong style='font-weight:normal;color:#666'>{{i.tchNames.replace('|','').replace('|','')}}</strong></span>
	                                <span class="fr">时长：<strong style='font-weight:normal;color:#666'>{{i.csHour}}分钟</strong></span>
	                            </div>
	                        </li>
	                    </ul>
	                </dl>
	            </dd>
	        </div>
	    </div>
	    <div class="latestCourse course-list" v-show='recomCourseList.length>0' >
	        <i class="left recomPrevious" v-bind:class="{disabled:!searchData.recomIfPre}"><</i>
	        <i class="right  recomNext" v-bind:class="{disabled:!searchData.recomIfNext}" @click="addrecomCourse()">></i>
	        <div class="latestCourse_list" style='height:483px;'>
	            <h3 class='titles'>推荐课程</h3>
	            <dd class="latestCourseContainer2"  style='width:12000px;height:479px;position:absolute;top:35px;left:0px;'>
	                <dl class="fl " v-for='courseList in recomCourseList' v-bind:class='($index+1)' style='width:1198px;'>
	                    <ul class="">
	                        <li class="fl" v-for='(i,index) in courseList' v-bind:class='{last:(index+1)%5==0}'>
	                            <a v-bind:href="'/schoolLessonDetail.do?courseId='+i.courseId" v-bind:title="i.csName">
	                            	<img v-bind:src="'http://image.zfwx.com'+i.csImg.split(',')[0]" alt="">
	                            </a>
	                            <i class="tuijian" v-if='i.csTjOrder'></i>
	                            <div class="courseInfo">
	                                <a v-bind:href="'/schoolLessonDetail.do?courseId='+i.courseId" class="courseName" v-bind:title="i.csName">{{i.csName}}</a>
	                                <span class="fl">讲师：<strong style='font-weight:normal;color:#666'>{{i.tchNames.replace('|','').replace('|','')}}</strong></span>
	                                <span class="fr">时长：<strong style='font-weight:normal;color:#666'>{{i.csHour}}分钟</strong></span>
	                            </div>
	                        </li>
	                    </ul>
	                </dl>
	            </dd>
	        </div>
	    </div>
	    <div class="latestCourse course-list" v-show='weekCourseList.length>0'>
	        <i class="left weekPrevious" v-bind:class="{disabled:!searchData.weekIfPre}"><</i>
	        <i class="right  weekNext" v-bind:class="{disabled:!searchData.weekIfNext}" @click="addWeekCourse()">></i>
	        <div class="latestCourse_list" style='height:483px;'>
	            <h3 class='titles'>每周热搜</h3>
	            <dd class="latestCourseContainer3" style='width:12000px;height:479px;position:absolute;top:35px;left:0px;'>
	                
	                <dl class="fl"  v-for='courseList in weekCourseList' v-bind:class='($index+1)' style='width:1198px;'>
	                    <ul class="">
	                        <li class="fl" v-for='(i,index) in courseList' v-bind:class='{last:(index+1)%5==0}'>
	                            <a v-bind:href="'/schoolLessonDetail.do?courseId='+i.courseId" v-bind:title="i.csName">
	                            	<img v-bind:src="'http://image.zfwx.com'+i.csImg.split(',')[0]" alt="">
	                            </a>
	                            <i class="tuijian" v-if='i.csTjOrder'></i>
	                            <div class="courseInfo">
	                                <a v-bind:href="'/schoolLessonDetail.do?courseId='+i.courseId" class="courseName" v-bind:title="i.csName">{{i.csName}}</a>
	                                <span class="fl">讲师：<strong style='font-weight:normal;color:#666'>{{i.tchNames.replace('|','').replace('|','')}}</strong></span>
	                                <span class="fr">时长：<strong style='font-weight:normal;color:#666'>{{i.csHour}}分钟</strong></span>
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
	import $ from 'jquery';
	import axios from 'axios';
	import {searchApi} from '../../api/index.js';
	export default {
		data : function(){
			return {
				searchData : {}
			}
		},
		methods : {
			reloadThis : function(){
				this.$router.go(-1);
			},
			addNewsCourse : function(){
				let getNewsCourse = searchApi.getNewsCourse;
				if(this.searchData.newsCourseCurrent >= this.searchData.newsCourseMaxPage){
	                return;
	            }
	            this.searchData.newsCourseCurrent ++;
				axios[getNewsCourse.method](getNewsCourse.url,{params : getNewsCourse.params})
					.then( (response)=>{
						this.searchData.newsCourseList[this.searchData.newsCourseCurrent-1] = response.data.result.data;
						this.$store.dispatch('setSearchData',this.searchData);
					});
			},
			addrecomCourse : function(){
				let getRecomCourse = searchApi.getRecomCourse;
				if(this.searchData.recomCourseCurrent >= this.searchData.recomCourseMaxPage){
	                return;
	            }
	            this.searchData.recomCourseCurrent ++;
				axios[getRecomCourse.method](getRecomCourse.url,{params : getRecomCourse.params})
					.then( (response)=>{
						this.searchData.recomCourseList[this.searchData.recomCourseCurrent-1] = response.data.result.data;
						this.$store.dispatch('setSearchData',this.searchData);
					})
			},
			addWeekCourse : function(){
				let getWeekCourse = searchApi.getWeekCourse;
				if(this.searchData.weekCourseCurrent >= this.searchData.weekCourseMaxPage){
	                return;
	            }
	            this.searchData.weekCourseCurrent ++;
				axios[getWeekCourse.method](getWeekCourse.url,{params : getWeekCourse.params})
					.then( (response)=>{
						this.searchData.weekCourseList[this.searchData.weekCourseCurrent-1] = response.data.result.data;
						this.$store.dispatch('setSearchData',this.searchData);
					})
			}
		},
		computed : {
			newsCourseList(){
				return this.$store.getters.getSearchData.newsCourseList;
			},
			recomCourseList(){
				return this.$store.getters.getSearchData.recomCourseList;
			},
			weekCourseList(){
				return this.$store.getters.getSearchData.weekCourseList;
			},
			homeName(){
				return this.$store.getters.getPath;
			}
		},
		mounted : function(){
			let $newsNext     = $(this.$el).find(".newsNext");
            let $newsPrevious = $(this.$el).find(".newsPrevious");
            let $recomNext    = $(this.$el).find(".recomNext");
            let $recomPrevious= $(this.$el).find(".recomPrevious");
            let $weekNext     = $(this.$el).find(".weekNext");
            let $weekPrevious = $(this.$el).find(".weekPrevious");
            let $courseContainer1 = $(this.$el).find(".latestCourseContainer1");
            let $courseContainer2 = $(this.$el).find(".latestCourseContainer2");
            let $courseContainer3 = $(this.$el).find(".latestCourseContainer3");              
            let index1=1;
            let index2=1;
            let index3=1;
            this.searchData  = this.$store.getters.getSearchData;
            let that = this;

            $courseContainer1.css('left','0px');
			$courseContainer2.css('left','0px');
			$courseContainer3.css('left','0px');

            $newsNext.on("click",function(){
                if($(this).hasClass("disabled")){
                    return false;
                }
                $courseContainer1.animate({'left':'-'+that.searchData.index1*1198+'px'},500,'swing',function(){
                    that.searchData.index1++;
                    var flag1= that.searchData.newsCourseMaxPage;
                    if(that.searchData.index1>1&&that.searchData.index1<flag1){
                        that.searchData.newsIfPre=true;
                        that.searchData.newsIfNext=true;
                    }
                    if(that.searchData.index1==flag1){
                        that.searchData.newsIfNext=false;
                        that.searchData.newsIfPre=true;   
                    }

                    that.$store.dispatch('setSearchData',that.searchData);
                });
            })
            $newsPrevious.on("click",function(){ 
                if($(this).hasClass("disabled")){
                    return false;
                }
                $courseContainer1.animate({'left':'-'+((that.searchData.index1-2)*1198)+'px'},500,'swing',function(){
                    var flag1=that.searchData.newsCourseMaxPage;;
                    that.searchData.index1--;
                    if(that.searchData.index1>1&&that.searchData.index1<flag1){
                        that.searchData.newsIfPre=true;
                        that.searchData.newsIfNext=true;
                    }
                    if(that.searchData.index1==1){
                        that.searchData.newsIfPre=false;
                        that.searchData.newsIfNext=true;
                    }

                    that.$store.dispatch('setSearchData',that.searchData);
                });
                
            });
            $recomNext.on("click",function(){
                if($(this).hasClass("disabled")){
                    return false;
                }
                $courseContainer2.animate({'left':'-'+that.searchData.index2*1198+'px'},500,'swing',function(){
                     that.searchData.index2++;
                     var flag2 = that.searchData.recomCourseMaxPage;
                    if(that.searchData.index2>1&&that.searchData.index2<flag2){
                        that.searchData.recomIfPre=true;
                        that.searchData.recomIfNext=true;
                    }
                    if(that.searchData.index2==flag2){
                        that.searchData.recomIfPre=true;
                        that.searchData.recomIfNext=false;
                    }
                    that.$store.dispatch('setSearchData',that.searchData);
                });
               
            })
            $recomPrevious.on("click",function(){
                if($(this).hasClass("disabled")){
                    return false;
                }
                $courseContainer2.animate({'left':'-'+((that.searchData.index2-2)*1198)+'px'},500,'swing',function(){
                    var flag2 = that.searchData.recomCourseMaxPage;
                    that.searchData.index2--;
                    if(that.searchData.index2>1&&that.searchData.index2<flag2){
                        that.searchData.recomIfPre=true;
                        that.searchData.recomIfNext=true;
                    }
                    if(that.searchData.index2==1){
                        that.searchData.recomIfPre=false;
                        that.searchData.recomIfNext=true;
                    }

                    that.$store.dispatch('setSearchData',that.searchData);
                });
                
            })
            $weekNext.on("click",function(){
                if($(this).hasClass("disabled")){
                    return false;
                }
                $courseContainer3.animate({'left':'-'+that.searchData.index3*1198+'px'},700,'swing',function(){
                    var flag3 = that.searchData.weekCourseMaxPage;
                   that.searchData.index3++;
                    if(that.searchData.index3>1&&that.searchData.index3<flag3){
                        that.searchData.weekIfPre=true;
                        that.searchData.weekIfNext=true;
                    }
                    if(that.searchData.index3==flag3){
                        that.searchData.weekIfPre=true;
                        that.searchData.weekIfNext=false;
                    }

                    that.$store.dispatch('setSearchData',that.searchData);
                });
                
            })
            $weekPrevious.on("click",function(){
                if($(this).hasClass("disabled")){
                    return false;
                }
                $courseContainer3.animate({'left':'-'+((that.searchData.index3-2)*1198)+'px'},700,'swing',function(){
                     that.searchData.index3--;
                      var flag3 = that.searchData.weekCourseMaxPage;
                    if(that.searchData.index3>1&&that.searchData.index3<flag3){
                        that.searchData.weekIfPre=true;
                        that.searchData.weekIfNext=true;
                    }
                    if(that.searchData.index3==1){
                        that.searchData.weekIfPre=false;
                        that.searchData.weekIfNext=true;
                    }

                    that.$store.dispatch('setSearchData',that.searchData);
                });
               
            })
		}
	}
</script>
<style lang='sass'>
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