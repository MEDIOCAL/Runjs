<template>
	<div>
		<div>
			<div class="title">
	             <div class="line_shu fl"></div>
	             <span class="title_show fl">律协网校</span>
	             <span @click='changePath("recommendWx")'><router-link  to="/recommendWx?casOrgType=1" class='more'>更多</router-link></span>
	        </div>
	        <lx-wx :lxwx-data='lxwxData'></lx-wx>
		</div>
		<div style='overflow:hidden;margin-bottom:30px;'>
			<lxxy-list v-for= '(d,index) in lxxylist' :my-data='d' v-bind:class='{"mr25":index%2==0}'></lxxy-list>
		</div>
		<dong-tai></dong-tai>
		<div class='bottomThreeParts'>
			<div class="line_left"></div>
			<div class="line_right"></div>
			<my-rank :xy-rank='xyRank' :rank-lis='rankLis'></my-rank>
			<my-commit></my-commit>
			<lx-team></lx-team>			
		</div>
		<shen-qing></shen-qing>
	</div>
</template>

<script>
	import lxWx        from '../components/lawyerAssociation/lxwx.vue';
	import dongTai     from '../components/dongtai.vue';
	import myRank      from '../components/rank.vue';
	import myCommit    from '../components/commit.vue';
	import lxTeam      from '../components/lawyerAssociation/lxTeam.vue';
	import lxxyList    from '../components/lawyerAssociation/lxxylist.vue';
	import shenQing    from '../components/shenqing.vue';
	import axios from 'axios';
	import { getLxWx ,getCollege ,getLxXyWx} from '../../api/index.js';
	export default{
		data : function(){
			return {
				lxwxData : {},
				xyRank : {},
				rankLis : {},
				lxxylist : {}
			}
		},
		components : {
			lxWx,
			dongTai,
			myRank,
			myCommit,
			lxTeam,
			shenQing,
			lxxyList
		},
		mounted : function(){
			axios[getLxWx.method](getLxWx.url).then( (response)=>{
				this.lxwxData = response.data.result.data
			});	
			axios[getCollege.method](getCollege.url).then((response)=>{
				let data = response.data;
				this.xyRank  = data.result.data.splice(0,3);
				this.rankLis = data.result.data; 
			});
			axios[getLxXyWx.method](getLxXyWx.url).then( (response)=>{
				this.lxxylist = response.data.result.data
			});	
		}
	}
</script>

<style lang='sass'>
</style>