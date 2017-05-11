<template>
	<div>
		<div class='ftf_recommend'>
			<ftf-list></ftf-list>
			<ftf-img></ftf-img>
		</div>
		<div class='ftf_all_list'>
			<div class='ftf_classify'>
				<div class='ftf_category fl'>
					<ul>
						<li class='fl current'><a href="javascript:void(0)">全部</a></li>
						<li class='fl'><a href="javascript:void(0)">班级</a></li>
						<li class='fl'><a href="javascript:void(0)">微课</a></li>
						<li class='fl'><a href="javascript:void(0)">沙龙</a></li>
						<li class='fl'><a href="javascript:void(0)">论坛</a></li>
						<li class='fl'><a href="javascript:void(0)">训练营</a></li>
					</ul>
				</div>
				<div class='ftf_filter fl'>
					<span class="filterLabel fl">筛选：</span>
					<ul>
						<li class='fl'> <i></i>全部</li>
						<li class='fl'> <i></i>报名中</li>
						<li class='fl'> <i></i>教学中</li>
						<li class='fl'> <i></i>已结业</li>
					</ul>
				</div>
			</div>
		</div>
		<face-toface :ftof-list='ftofList'></face-toface>
	</div>
</template>
<script>
	import ftfList from '../components/ftfList/ftfList.vue'; 
	import ftfImg  from '../components/ftfList/ftfImg.vue'; 
	import ftofAll  from '../components/ftofAll.vue'; 
	import faceToface  from '../components/faceToface.vue';
	import {getFaceAll} from '../../api/index.js'; 
	import axios from "axios";
	export default{
		data : function(){
			return {
				ftofList : {}
			}
		},
		components : {
			ftfList,
			ftfImg,
			ftofAll,
			faceToface
		},
		mounted : function(){
			axios[getFaceAll.method](getFaceAll.url).then( (response)=>{
				this.ftofList = response.data.result.data;
			});
			setTimeout(()=>{
				$('html, body').animate({scrollTop:0}, 'slow');
			},400)
		}
	}
</script>

<style lang='sass'>
	.ftf_recommend {
	    box-sizing: border-box;
	    width: 100%;
	    height: 490px;
	    padding: 30px 0 40px 0;
	}
	.ftf_all_list{overflow: auto;margin-bottom:40px;margin-top:20px;}
	.ftf_all_list .ftf_classify{box-sizing:border-box;width:100%;height:40px;overflow: auto}
	.ftf_all_list .ftf_classify .ftf_category{box-sizing:border-box;width:820px;height:40px;overflow: auto}
	.ftf_all_list .ftf_classify .ftf_category li{box-sizing:border-box;height:40px;}
	.ftf_all_list .ftf_classify .ftf_category li a{display:block;padding:0 34px;height:100%;line-height:40px;text-align:center;font-size:18px;color:#000;border-radius:10px;}
	.ftf_all_list .ftf_classify .ftf_category li.current a{background-color: #0b67ff;color:#fff}
	.ftf_all_list .ftf_classify .ftf_category li a:hover{background-color: #5494ff;color:#fff}
	.ftf_all_list .ftf_classify .ftf_filter{width:370px;height:40px;overflow: auto}
	.ftf_all_list .ftf_classify .ftf_filter .filterLabel{font-size:15px;color:#000;line-height:40px;}
	.ftf_all_list .ftf_classify .ftf_filter  ul{height:40px;}
	.ftf_all_list .ftf_classify .ftf_filter  ul li{height:40px;line-height:40px;text-align:right;margin-right:10px;cursor:pointer;}
	.ftf_all_list .ftf_classify .ftf_filter  i{display:block;width:13px;height:13px;border-radius:50%;-webkit-border-radius:50%;-moz-border-radius:50%;-ms-border-radius:50%;float:left;border:1px solid #00c5ae;margin-top:13px;margin-right:6px;}
	.ftf_all_list .ftf_classify .ftf_filter .categoryList{box-sizing:border-box;height:40px;overflow: hidden;border-bottom:1px solid #dcdcdc}
	.ftf_all_list .ftf_classify .ftf_filter .categoryList li{height:100%;line-height:42px;}
	.ftf_all_list .ftf_classify .ftf_filter .categoryList li input[type="radio"]{display:none}
	.ftf_all_list .ftf_classify .ftf_filter .categoryList li input[type="radio"]+label{display:inline-block;box-sizing: border-box;text-align: left;font-size:15px;color:#000}
	.ftf_all_list .ftf_classify .ftf_filter .categoryList li input[type="radio"]+label::before{content:""; display: inline-block;box-sizing:border-box;vertical-align:middle;width:17px;height:17px;border-radius:50%;border:1px solid #d2d2d2;margin:0 7px; -webkit-transition:background ease-in .1s}
	.ftf_all_list .ftf_classify .ftf_filter .categoryList li input[type="radio"]:checked+label::before{box-sizing:border-box;border-radius:50%;background-color:#4374ff;border:3px solid #d2d2d2;}
	.ftf_all_list .ftf_classify .ftf_filter .categoryList li input[type="radio"]:checked+label{color:#4374ff}
	.ftf_all_list .pager{width:300px;height:33px;box-sizing: border-box;overflow: hidden}
	.ftf_all_list .pager .left{display:block;width:30px;height:33px;box-sizing: border-box;border:1px solid #e6e7ec;border-radius:5px;cursor: pointer}
	.ftf_all_list .pager .left icon{display: block;width: 0;height: 0; border-left: 7px solid transparent;border-right: 7px solid transparent;border-bottom: 7px solid #919191;transform: rotate(-90deg);margin: 12px 0px 0px 6px;}
	.ftf_all_list .pager .currentPage,.content .ftf_all_list .pager .lineSplit,.content .ftf_all_list .pager .pageCount{display:inline-block;color:#000;font-size:14px;line-height:30px;margin:0 2px;}
	.ftf_all_list .pager .right{display:block;width:30px;height:33px;box-sizing: border-box;border:1px solid #e6e7ec;border-radius:5px;cursor: pointer}
	.ftf_all_list .pager .right icon{display: block;width: 0;height: 0; border-left: 7px solid transparent;border-right: 7px solid transparent;border-bottom: 7px solid #919191;transform: rotate(90deg);margin: 12px 0px 0px 6px;}
	.ftf_all_list .pager input{width:75px;height:30px;border:1px solid #e6e6e6;border-radius:5px;outline: none;margin:0 10px;padding:0 10px;}
	.ftf_all_list .pager span.goPageBtn{display:inline-block;width:50px;height:30px;border:1px solid #e6e6e6;border-radius:5px;text-align:center;color:#666;line-height:30px;cursor: pointer;font-size:14px;}

</style>