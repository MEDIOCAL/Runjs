<template>
	<div>
        <div class="ftof_regulation">
		    <div class="relation_list">
		        <ul>
		            <li class="fl" v-bind:class="{last:index%2==1,bobt:index==1||index==0}" v-for="(item,index) in ftofList" >
		                <a v-bind:href="'http://www.zfwx.com/DjActivity/getActivityInfo.do?activityId='+item.activityId" target="_blank">
		                <i class="share"></i>
		                <img v-bind:src="'http://www.zfwx.com'+item.publicityImg | toArray(',')" alt="" class="fl"/>
		                <div class="ftof_info">
		                    <p class="ftf_courseName">{{item.activityName}}</p>
		                    <p class="course_introduce" v-html="item.generalSituation"></p>
		                    <span class="courseLabel fl" v-for="label in item.activityTags" >{{label}}</span>
		                    <div class="ftof_msg">
		                        <label class="date">
		                        	<i class="fl"></i>
		                        	<span>{{item.checkinBeginTime | date('YYYY-MM-DD')}}</span> ~ 
		                        	<span>{{item.endTime | date('YYYY-MM-DD')}}</span>
		                        </label>
		                        <label class="place" v-bind:title="item.addr"><i class="fl"></i>{{item.addr}}</label>
		                        <label class="num"><i class="fl"></i>已报{{item.realPerson?item.realPerson:0}}人</label>
		                    </div>
		                </div>
		                </a>
		            </li>
		        </ul>
		    </div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['ftofList'],
	}
</script>
<style lang='sass'>
	.title {
	    width: 100%;
	    height: 26px;
	    margin-bottom: 18px;
	    box-sizing: border-box;
	    margin-top: 14px;
	}
	.line_shu {
	    width: 3px;
	    height: 26px;
	    background: url('../img/icons.png') no-repeat center;
	    background-position: -172px -23px;
	    box-sizing: border-box;
	}
	.fl {
	    float: left;
	}
	.title_show {
	    display: block;
	    margin: 0 14px 0 15px;
	    color: #313131;
	    font-size: 24px;
	    line-height: 26px;
	    box-sizing: border-box;
	}
	.title .more {
	    font-size: 16px;
	    line-height: 32px;
	    color: #4374ff;
	    cursor: pointer;
	    box-sizing: border-box;
	    padding-right: 9px;
	    background: url(../img/ls_more.png) no-repeat right 5px;
	}
	/*面授简章*/
	.ftof_regulation{box-sizing: border-box;margin-top:10px;}
	.relation_list,.relation_list ul{box-sizing: border-box;overflow: auto}
	.relation_list li i.share{z-index:999;box-sizing: border-box;display: none;position: absolute;top:-20px;right:14px;width:64px;height:48px;background: url("../img/icons.png") no-repeat center;background-position:-77px -122px;cursor:pointer}
	.relation_list li:hover i.share{box-sizing: border-box;display: block;cursor:pointer}
	.relation_list ul li{box-sizing: border-box;position:relative;width:592px;height:184px;padding:14px;margin-bottom:20px;overflow: auto;border:1px solid transparent;}
	.relation_list ul li.bobt{border-bottom:1px solid #fafafa;}
	.relation_list ul li:hover{background-color: #fff;border:1px solid #d6e1ff;}
	.relation_list ul li.last{box-sizing: border-box;margin-left:16px;}
	.relation_list ul li img{box-sizing: border-box;width:150px;height:150px;margin-right:15px;}
	.relation_list ul li .ftof_info{box-sizing: border-box;position:relative;height:150px;overflow: hidden}
	.relation_list ul li .ftof_info .ftf_courseName{width:340px;box-sizing: border-box;font-size:18px;color:#313131;white-space: nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:5px;}
	.relation_list ul li .ftof_info .course_introduce{height:auto;max-height:52px;box-sizing: border-box;overflow:hidden;font-size:12px;line-height:17px;color:#313131;opacity: 0.5}
	.courseLabel{box-sizing: border-box;display:block;border:1px solid #362e2b;color:#362e2b;padding:2px 10px;cursor: pointer;border-radius: 2px;margin-right:10px;margin-top:8px;}
	.courseLabel:hover{border:1px solid #4374ff;color:#4374ff}
	.relation_list ul li .ftof_info .ftof_msg{box-sizing: border-box;width:100%;position:absolute;display: flex;justify-content: space-between;left:0;bottom:7px;height:20px;}
	.relation_list ul li .ftof_info .ftof_msg label{box-sizing: border-box;line-height:17px;font-size:12px;color: #313131;opacity: 0.8;}
	.relation_list ul li .ftof_info .ftof_msg label.place{max-width:100px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis}
	.relation_list ul li .ftof_info .ftof_msg i{box-sizing: border-box;display: block;width:17px;height:17px;background: url('../img/icons.png') no-repeat center;margin-right:5px;}
	.relation_list ul li .ftof_info .ftof_msg .date i{box-sizing: border-box;background-position:-28px -28px; }
	.relation_list ul li .ftof_info .ftof_msg .place i{box-sizing: border-box;background-position:-28px -74px;}
	.relation_list ul li .ftof_info .ftof_msg .num i{box-sizing: border-box;background-position:-28px -120px;}
</style>