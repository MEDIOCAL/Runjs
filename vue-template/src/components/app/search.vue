<template>
	<div class='search-nav' v-bind:style="'background:url(./src/img/'+getBackground+') no-repeat center center'">
		<div class='search-wrap'>
			<div class='search' v-bind:class='{show : listShow}'>
				<div class='search-inp'>
					<div @mouseleave='listOrShow(false)'>
						<p class='qiehuan' @mouseenter='listOrShow(true)'><a href=''>切换：</a><span>全国</span></p>
						<div class='address' v-if='listShow'>
							<ul>
								<li v-for='d in citys'><a href="javascript:void(0)"  style='color:#999;'>{{d.shortname}}</a></li>
							</ul>
						</div>
					</div>			
					<div class='input'>
						<i class='icon_search' v-show='isshow' @click='hidden'>请输入你要听的课程</i>
						<input type='text' v-model='search.searchText' @keyup.13='toSearch()' @keyup='isNull(search.searchText)' id='searchs' />	
						<a href="javascript:void(0)" @click='toSearch()'>搜索一下</a>
					</div>
				</div>
				<div class='hotSearch'>
					<span style='margin-right:5px;'>热搜&nbsp;&nbsp;:</span>
					<span v-for='d in hotinfos' @click='toHotSearch(d.id)'>{{d.name}}</span>
				</div>
				<div class='search-lis'></div>
			</div>
		</div>
		<div class='nav-wrap'>
			<div class='nav'>
				<a href="javascript:void(0)" class='fr dianke' @click='wantLis()'>我要听</a>
				<!-- <a href="/" target='_blank' class='nav-son'>选课</a>
				<a href="" class='nav-son' ng-click='reload($event)'>专业</a>
				<a href="./ftfList.do" class='nav-son' ng-click='reload($event)'>面授</a>
				<a href="./lawyerAssociation.do" class='nav-son' ng-click='reload($event)'>律协</a> -->
                <span class='nav-son' @click='changePath("ftfList")'><router-link  to="/ftfList" >面授</router-link></span>
				<span class='nav-son' @click='changePath("lawyer")'><router-link  to="/lawyer" >专家</router-link></span>
                <span class='nav-son' @click='changePath("lawyerfirm")'><router-link  to="/" >律所</router-link></span>
				<span class='nav-son' @click='changePath("lawyerAssociation")'><router-link  to="/lawyerAssociation" >律写</router-link></span>
			<!-- 	<a href="./lawyer.do" class='nav-son' ng-click='reload($event)'>专家</a>
				<a href="./newsletter.do" class='nav-son' ng-click='reload($event)'>时讯</a> -->
				<div class='shixun'>
					<div class='ad-list'>
						<a  v-for='d in notices' v-bind:href="d.adUrl" target='_blank'>{{d.adTitle}}</a>
						<a  v-bind:href="notices[0].adUrl" target='_blank'>{{notices[0].adTitle}}</a>
					</div>
				</div>
			</div>
		</div>
		<want-lis  v-if='isDianke'></want-lis>
        <div class='diankebg'  v-show='colseShenqing'></div>
	</div>
</template>
<script>
	import {searchApi} from '../../../api/index.js';
	import axios    from 'axios';
	import wantLis from '../wantlis.vue';
	import $ from 'jquery';
	export default {
		data : function(){
			return {
				listShow : false,
				citys    : [],
				hotinfos : [],
				notices  : [{
                    adUrl : '',
                    adTitle : ''

                }],
				search   : {
					searchText   : '',
					coursetypeId : -1
				},
				searchType : '全部',
                searchText : '',
                isshow : true
			}
		},
		computed : {
			getBackground(){
				return this.$store.getters.getBackground;
			},
			getSearchData(){
				return this.$store.getters.getSearchData;
			},
            isDianke (){
                return this.$store.getters.getDianke;
            },
            colseShenqing(){
                return this.$store.getters.getCoop || this.$store.getters.getDianke ;
            }
		},
		created : function() {
			let index = 0;
			let getCity      = searchApi.getCity;
			let getHotInfo   = searchApi.getHotinfo;
			let getAdverting = searchApi.getAdverting;
			// 城市
			axios[getCity.method](getCity.url).then( (response) => {
				this.citys = response.data.result;
			});
			// 热搜
			axios[getHotInfo.method](getHotInfo.url).then( (response) => {
				this.hotinfos = response.data.result;
				console.log(this.hotinfos)
			});
			// 广告
			axios[getAdverting.method](getAdverting.url,{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }).then( (response) => {
				this.notices = response.data.result.data;
			});

			//动画
			setInterval( () => {
				if(index < this.notices.length){
					 index++;
				}
				if(index == this.notices.length){
					$(this.$el).find('.ad-list').animate({"top":'-'+index*16+"px"},300,"swing",function(){
						index = 0;
						$(this).css('top','0px');
					});
				}else{
					$(this.$el).find('.ad-list').animate({"top":'-'+index*16+"px"},300);
				}
			},2500);
            
		},
		methods : {
			listOrShow : function(b){
				this.listShow = b;
			},
            getNewsCourse : function (){
                let getNewsCourse = searchApi.getNewsCourse;
                return axios[getNewsCourse.method](getNewsCourse.url,{params : getNewsCourse.params});
            },
            getRecomCourse : function (){
                let getRecomCourse = searchApi.getRecomCourse;
                return axios[getRecomCourse.method](getRecomCourse.url,{params : getRecomCourse.params});
            },
            getWeekCourse : function (){
                let getWeekCourse = searchApi.getWeekCourse;
                return axios[getWeekCourse.method](getWeekCourse.url,{params : getWeekCourse.params});
            },
			searchGetData : function(){
                let searchData = {
                        "newsCourseMaxPage"  : "",
                        "recomCourseMaxPage" : "",
                        "weekCourseMaxPage"  : "",
                        "newsCourseCurrent"  : 2,
                        "recomCourseCurrent" : 2,
                        "weekCourseCurrent"  : 2,
                        "newsIfNext" : true,
                        "newsIfPre"  : false,
                        "recomIfNext" : true,
                        "recomIfPre"  : false,
                        "weekIfNext" : true,
                        "weekIfPre"  : false,
                        "index1" : 1,
                        "index2" : 1,
                        "index3" : 1,
                        "newsCourseList" : [],
                        "recomCourseList" : [], 
                        "weekCourseList" : [],
                        "searchText" : this.search.searchText
                }
                axios.all([this.getNewsCourse(),this.getRecomCourse(),this.getWeekCourse()])
                     .then(axios.spread( (NewsCourse, RecomCourse, WeekCourse) => {
                           if(NewsCourse.data.result.data.length<1&&RecomCourse.data.result.data.length<1&&WeekCourse.data.result.data.length<1){
                                this.wantLis();
                           }else{
                                searchData.newsCourseMaxPage  =  Math.ceil(NewsCourse.data.result.totalCount/10);
                                searchData.recomCourseMaxPage =  Math.ceil(RecomCourse.data.result.totalCount/10);
                                searchData.weekCourseMaxPage  =  Math.ceil(WeekCourse.data.result.totalCount/10);
                               
                                searchData.newsCourseList[0]  = NewsCourse.data.result.data.slice(0,10);
                                searchData.recomCourseList[0] = RecomCourse.data.result.data.slice(0,10);
                                searchData.weekCourseList[0]  = WeekCourse.data.result.data.slice(0,10);
                               
                                if(searchData.newsCourseMaxPage < 2){
                                   searchData.newsIfNext=false;
                                }else{
                                   searchData.newsCourseList[1] = NewsCourse.data.result.data.slice(10,20);  
                                }

                                if(searchData.recomCourseMaxPage < 2){
                                   searchData.recomIfNext=false;
                                }else{
                                   searchData.recomCourseList[1] = RecomCourse.data.result.data.slice(10,20);  
                                }

                                if(searchData.weekCourseMaxPage < 2){
                                   searchData.weekIfNext=false;
                                }else{
                                   searchData.weekCourseList[1] = WeekCourse.data.result.data.slice(10,20);  
                                }
                                this.$store.dispatch('setSearchData',searchData);
                                this.$router.push('/search');
                           }
                     }))
			},
			toSearch : function(b){
                if(!this.search.searchText){
                    alert("不能为空!");
                    return;
                }
                this.searchText = this.search.searchText;
                this.searchGetData();
			},
			toHotSearch : function(id){
                this.searchText = id;
                this.search.searchText = '';
                $(this.$el).find('.icon_search').css('display','none');
                this.searchGetData();
			},
			isNull : function(n){
				if(n){
                    this.isshow = false;
                }else{
                    this.isshow = true;
                }
			},
			wantLis : function(){
				this.$store.dispatch('setDianke',true);
			},
            changePath : function(path){
                this.$store.dispatch('setPath',path)
            },
            hidden : function(){
                $('#searchs').focus();
            }
		},
		components : {
			wantLis
		}
	}
</script>
<style lang='sass'>
	/*搜索 ------------ start*/
 .search-nav{
    color:#fff;
    font-size:12px;
    /*background:url(../../images/jhy/background.jpg) no-repeat center center;*/
    background-size:115% 100%;
 }
 .search-nav .search-inp{
    position : relative;
    height:42px;
 }
 .search-nav .address{
    position:absolute;
    top:39px;
    left:0px;
    z-index:300;
    width:300px;
    background:#fff;
    padding:5px 5px;
    border:1px solid #ccc;
    display:none;
 }
 .search-nav .show  .address{
    position:absolute;
    top:39px;
    left:0px;
    z-index:300;
    width:300px;
    background:#fff;
    padding:5px 5px;
    border:1px solid #ccc;
    display:block;
 }
 .search-nav .address li{
    width:60px;
    height:30px;
    text-align: center;
    line-height: 30px;
    float: left;
 }
 .search-nav .address li a{
        color:#000;
 }
 .search-nav .address li:hover a{
    color:#00a2e6;
 }
 .search-nav a{
    color:#fff;
 }
 .qiehuan a{
    color:#000;
    font-size:13px;
    font-family: "宋体";
 }
 .qiehuan  span{
    color:#000;
    font-size:13px;
    font-family: "宋体";
 }
 .qiehuan:hover span{
    color:#999;
 }
 .search-nav a:hover{
    color:#fff;
 }
 .search-nav .search-wrap{
    height:260px;
    width:100%;
    /*background:url(../images/search_bg.png) no-repeat center center;*/

    position:relative;
 }
 .search-nav .search{
    width:786px;
    height:160px;
    padding-top:132px;
    margin:0 auto;
    /*background:url(../images/dj_bg.png) no-repeat 0px 0px;*/
 }
 .search-nav .search p{
    float:left;
    height:40px;
    line-height:40px;
    margin-right:10px;
    padding:0 10px;
    /*text-shadow:1px 1px #666;*/
    z-index:302;
    border:1px solid  transparent;
 }
 .search-nav .show.search p{
    float:left;
    height:40px;
    position:relative;
    line-height:40px;
    margin-right:10px;
    padding:0 10px;
    z-index:301;
    background:#fff;
    text-shadow:0px 0px #fff;
    color:#999;
    border:1px solid #ccc;
    border-bottom:0 none;
 }
 .search-nav .show p  a{
    color:#999;
 }
 .search-nav .input{
    position:relative;
    border:1px solid #ccc;
    display:inline-block; 
    float:left;
 }
 .search-nav .icon_search{
    display: inline-block;
    padding-left:20px;
    height:18px;
    position:absolute;
    left:5px;
    top:11px;
    background:url('../../img/icon_1.png') no-repeat -3px 0px;
    color:#999;
    line-height:18px;
    cursor: text;
    font-size:14px;
    font-style: normal;
 }
 .input input, .input .retrieval ,.input a{
    float:left;
    background:#fff;
    display:inline-block;
    height:38px;
    line-height: 38px;
 }
 .search-nav input{
    width:530px;
    color:#999;
    padding: 0 14px 0 6px;
    border:0 none;
    outline: none;
 }
 /*.search-nav .retrieval{
    color:#999;
    display:inline-block;
    background:#fff;
    height:40px;
    width:75px;
    padding:0px 0px 0px 0px;
    line-height:40px;
    cursor:pointer;
    border-right:1px solid #ccc;
    position:relative;
 }*/
 .search-nav .retrieval span{
    display:block;
    width:75px;
    height:20px;
    line-height: 20px;
    position:relative;
    top:0px;
    left:0px;
    z-index:200;
    text-align: center;
 }
 .search-nav .input a{
    width:89px;
    text-align: center;
    color:#000;
    font-size:16px;
    border-left: 1px solid #ccc;
 }
 .search-nav .icon-down{
    display: inline-block;
    width:10px;
    height:10px;
    background:url(../../img/icon_1.png) no-repeat -8px -62px;
    position:absolute;
    right:8px;
    top:6px;
 }
.search-nav .list{
    position:absolute;
    top:30px;
    left:0px;
    width:75px;
    border:1px solid #ccc;
    z-index:200;
}
.search-nav .list li{
    width:75px;
    height:38px;
    line-height:38px;
    text-align: center;
    background:#fff;
    color:#000;
}
.search-nav .list li:hover{
    color:#00a2e6;
}
.search-nav  .hotSearch{
    padding-left:124px;
    margin-top:10px;
}
.search-nav  .hotSearch span{
    margin-right:10px;
    cursor: pointer;
    /*text-shadow: 1px 1px #999;*/
    color:#808b95;
}
.search-nav  .hotSearch span:hover{
    color:#0756e3;
}
.nav-wrap{
    height:40px;
    position:relative;
}
.nav{
    width:1198px;
    position: absolute;
    left:50%;
    margin-left:-599px;
    line-height:40px;
    z-index:2;
    top:0px;
 }
 .nav1 .nav-son{
   font-family: "黑体";
 }
 .nav-son{
    font-size:18px;
    font-weight: bold;
    filter:glow(color=black,strength=5); 
    text-shadow: 1px 1px #999;
    margin-right:58px;
    display:inline-block;
    float:left;
    height:30px;
    margin-top:5px;
    line-height:30px;
 }
 .nav-son.on{
    border-bottom:3px solid #fff;
 }
 .dianke{
    font-size:14px;
    padding-left:50px;
    background:url('../../img/dianke_icon.png') no-repeat 26px 11px;
 }
 .nav-wrap .shixun{
    padding:0 10px 0 30px;
    position:relative;
    left:-50px;
    background:url('../../img/icon_1.png') no-repeat 0px -106px;
    text-shadow: 1px 1px #999;
    display:inline-block;
    height:16px;
    line-height:16px;
    margin-top:13px;
    overflow:hidden;
    width:300px;
 }
.nav-wrap .ad-list{
    position:absolute;
 }
 .nav-wrap .ad-list a{
    display:block;
    width:100%;
    height:100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
    text-shadow: 0px 0px #999;
 }
 .nav-wrap .ad-list a:hover{
    text-decoration: underline;
 }
/*搜索 ------------ end*/
</style>