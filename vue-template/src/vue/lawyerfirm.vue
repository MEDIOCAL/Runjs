<template>
	<div>
		<later-course></later-course>
		<div>
			<div class="title">
	             <div class="line_shu fl"></div>
	             <span class="title_show fl">推荐网校</span>
	             <span @click='changePath("recommendWx")'><router-link  to="/recommendWx?casOrgType=3" class='more'>更多</router-link></span>
	        </div>
	       <recommon-wx></recommon-wx>
		</div>
		<div>
			<div class="title">
	             <div class="line_shu fl"></div>
	             <span class="title_show fl">面授简章</span>
	             <!-- <a href="/wxqt/ftfList.do#?casOrgType=3" target="_blank" class="more">更多</a> -->
	             <span @click='changePath("ftfList")'><router-link  to="/ftfList?casOrgType=3" class='more'>更多</router-link></span>
	        </div>
	        <face-toface :ftof-list='ftofList'></face-toface>
		</div>
		<dong-tai></dong-tai>
		<div class='bottomThreeParts'>
			<div class="line_left"></div>
			<div class="line_right"></div>
			<my-rank :xy-rank='xyRank' :rank-lis='rankLis'></my-rank>
			<my-commit></my-commit>
			<coo-perate></coo-perate>			
		</div>
		<shen-qing></shen-qing>
	</div>
</template>
<script>
	import laterCourse from '../components/latercourse.vue';
	import recommonWx  from '../components/lawyerfirm/recommWx.vue';
	import faceToface  from '../components/faceToface.vue';
	import dongTai     from '../components/dongtai.vue';
	import myRank      from '../components/rank.vue';
	import myCommit    from '../components/commit.vue';
	import cooPerate   from '../components/lawyerfirm/cooperate.vue';
	import shenQing    from '../components/shenqing.vue';
	import {getFtof ,getCollege} from '../../api/index.js';
	import axios from 'axios';
	export default {
		data : function(){
			return {
				ftofList : {},
				xyRank : [{
					id : '',
					banner : '',
					bottom : ''
				}],
				rankLis : {}
			}
		},
		methods : {
			changePath : function(path){
				console.log(path)
                this.$store.dispatch('setPath',path)
            }
		},
		components : {
			laterCourse,
			recommonWx,
			faceToface,
			dongTai,
			myRank,
			myCommit,
			cooPerate,
			shenQing
		},
		mounted : function(){
			axios[getFtof.method](getFtof.url).then( (response)=>{
				this.ftofList = response.data.result.data;
			});
			axios[getCollege.method](getCollege.url).then((response)=>{
				let data = response.data;
				this.xyRank  = data.result.data.splice(0,3);
				this.rankLis = data.result.data; 
			});
		} 
	}
</script>
<style lang='sass'>
	.bottomThreeParts {
	    box-sizing: border-box;
	    position: relative;
	    overflow: hidden;
	    margin-top:0px;
	}
	.line_left {
	    box-sizing: border-box;
	    position: absolute;
	    width: 1px;
	    height: 536px;
	    background-color: #e6e6e6;
	    top: 0px;
	    left: 236px;
	}
	.line_right {
	    box-sizing: border-box;
	    position: absolute;
	    width: 1px;
	    height: 536px;
	    background-color: #e6e6e6;
	    top: 0px;
	    left: 561px;
	}
	.diankebg {
	    z-index: 9998;
	    position: fixed;
	    left: 0;
	    top: 0;
	    width: 100%;
	    height: 100%;
	    background: #000;
	    opacity: 0.5;
	}
</style>