<template>
	<div>
		<later-course></later-course>
		<div class='teacher-wrap'>
			<div class="title">
	             <div class="line_shu fl"></div>
	             <span class="title_show fl">专家名师</span>
	             <span to="/recommendWx?casOrgType=3" class='more'>更多</router-link></span>
	        </div>
	        <lawyer-list></lawyer-list>
		</div>
		<div>
			<div class="title">
	             <div class="line_shu fl"></div>
	             <span class="title_show fl">面授简章</span>
	             <!-- <a href="/wxqt/ftfList.do#?casOrgType=3" target="_blank" class="more">更多</a> -->
	             <span @click='changePath("ftfList")'><router-link  to="/ftfList?casOrgType=1" class='more'>更多</router-link></span>
	        </div>
	        <face-toface :ftof-list='ftofList'></face-toface>
		</div>
		<dong-tai></dong-tai>
		<div class='bottomThreeParts'>
			<div class="line_left"></div>
			<div class="line_right"></div>
			<my-rank :xy-rank='xyRank' :rank-lis='rankLis'></my-rank>
			<my-commit></my-commit>
			<lawyer-team></lawyer-team>
		</div>
		<shen-qing></shen-qing>
	</div>
</template>
<script>
	import laterCourse from '../components/latercourse.vue';
	import faceToface  from '../components/faceToface.vue';
	import lawyerList  from '../components/lawyer/lawyerList.vue';
	import dongTai     from '../components/dongtai.vue';
	import myRank      from '../components/rank.vue';
	import myCommit    from '../components/commit.vue';
	import lawyerTeam  from '../components/lawyer/lawyerTeam.vue';
	import shenQing    from '../components/shenqing.vue';
	import { getFtof ,getCollege } from '../../api/index.js';
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
		components : {
			laterCourse,
			lawyerList,
			faceToface,
			dongTai,
			myRank,
			myCommit,
			lawyerTeam,
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