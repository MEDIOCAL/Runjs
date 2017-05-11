<template>
	<div class='rank fl'>
		<div class="title" style="margin-top:60px;">
          <div class="line_shu fl"></div>
          <span class="title_show fl">排行榜</span>
        </div>
        <div class="rank fl">
		  <div class="rankImg">
		      <img src="../img/topStar.jpg">
		  </div>
		  <div class="topStarList">
		      <ul>
		          <li class="side fl">
		              <a v-bind:href="'/wxqt/wangxiao.do?id='+xyRank[1]['id']" target='_blank'>
		              	<img v-bind:src="xyRank[1].banner" v-bind:title='xyRank[1].bottom'>
		              </a>
		              <span class="top2">2</span>
		              <p class="topData" style='line-height:36px;'>{{xyRank[1].wxBrowseNum}}</p>
		          </li>
		          <li class="topOne fl">
		              <a v-bind:href="'/wxqt/wangxiao.do?id='+xyRank[0].id" target='_blank'>
		              	<img v-bind:src="xyRank[0].banner" v-bind:title='xyRank[0].bottom'>
		              </a>
		              <span class="top1">1</span>
		              <p class="topData">{{xyRank[0].wxBrowseNum}}</p>
		          </li>
		          <li class="side fl">
		              <a v-bind:href="'/wxqt/wangxiao.do?id='+xyRank[2].id" target='_blank'>
		              	<img v-bind:src="xyRank[2].banner" v-bind:title='xyRank[2].bottom'>
		              </a> 
		              <span class="top3">3</span>
		              <p class="topData" style='line-height:36px;'>{{xyRank[2].wxBrowseNum}}</p>
		          </li>
		      </ul>
		  </div>
		  <div class="starList">
		      <ul>
		          <li v-for='(d,index) in rankLis'>
		              <span class="ranking fl">{{index+4}}</span>
		              <p class="wxName fl"   v-bind:title='d.bottom'>
		              	<a  v-bind:href="'/wxqt/wangxiao.do?id='+d.id" target='blank'>{{d.bottom}}</a> 
		              </p>
		              <span class="frequency fr">次</span>
		              <span class="wxClickNo fr">{{d.wxBrowseNum}}</span>
		          </li>
		      </ul>
		  </div>
		</div>
	</div>
</template>
<script>
	export default {
		props : [ 'xyRank' ,'rankLis']
	}
</script>

<style lang='sass'>
	/*排行榜*/
	.rank{box-sizing: border-box;width:211px;margin-right:26px;}
	.rank .rankImg{box-sizing: border-box;width:211px;height:66px;}
	.rank img{box-sizing: border-box;width:211px;height:66px;}
	.rank .topStarList{box-sizing: border-box;width:211px;height:135px;border:1px solid #e5e5e5;background-color: #fff}
	.rank .topStarList li.side{box-sizing: border-box;width:36%;height:100%;text-align:center}
	.rank .topStarList li.side img{box-sizing: border-box;width:45px;height:45px;margin-top:25px;border-radius:50%}
	.rank .topStarList li.topOne img{box-sizing: border-box;width:60px;height:60px;margin-top:10px;border-radius:50%}
	.rank .topStarList span.top2{box-sizing: border-box;display:block;margin:0 auto;width:35px;height:15px;line-height:15px;font-size:12px;border-radius:10px;color:#fff;background-color: #44c3b1}
	.rank .topStarList span.top3{box-sizing: border-box;display:block;margin:0 auto;font-size:12px;width:35px;height:15px;border-radius:10px;color:#fff;background-color: #b18f6a}
	.rank .topStarList span.top1{box-sizing: border-box;display:block;margin:0 auto;font-size:14px;width:40px;height:18px;border-radius:10px;color:#fff;background-color: #5262ff}
	.rank .topStarList p.topName{cursor:pointer;box-sizing: border-box;width:100%;text-align:center;font-size:12px;color:#000;line-height:22px;white-space: nowrap;overflow:hidden;text-overflow:ellipsis;}
	/*.rank .topStarList p.topData{box-sizing: border-box;width:100%;text-align:center;font-size:12px;color:#000}*/
	.rank .topStarList p.topData{box-sizing: border-box;width:100%;height:30px;line-height:30px;margin-top:5px;text-align:center;font-size:12px;color:#000}
	.rank .topStarList li.topOne{box-sizing: border-box;width:28%;height:100%;text-align:center}
	.rank .starList{box-sizing: border-box;width:100%;height:230px;border:1px solid #e5e5e5;border-top:none;padding:13px 13px 0 0;background-color: #fff }
	.rank .starList li{box-sizing: border-box;width:100%;height:30px;}
	.rank .starList li:hover .wxName a{color:#0756e3;}
	.rank .starList li span.ranking{box-sizing: border-box;display:block;width:30px;text-align:center;line-height: 30px;color:#5262ff;font-size:13px;}
	.rank .starList li p.wxName{box-sizing: border-box;width:98px;text-align:left;line-height:30px;color:#000;font-size:12px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis}
	.rank .xystarList li p.wxName{box-sizing: border-box;width:66px;text-align:left;line-height:30px;color:#000;font-size:12px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis}
	.rank .starList li span.frequency{box-sizing: border-box;display:block;height:30px;font-size:13px;line-height:30px;margin-left:4px;opacity: 0.5}
	.rank .starList li span.wxClickNo{box-sizing: border-box;display:block;height:30px;font-size:13px;line-height:30px;opacity: 0.7}
	.rank .starList a{color:#666;}
</style>