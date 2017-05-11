<template>
	<div>
		<div class="title">
            <div class="line_shu fl"></div>
            <span class="title_show fl">培训动态</span>
            <!-- <span class="more"> <a href="http://{{requirePath}}/wxqt/newsletter.do#?orgType=3" target='_blank' style='color:#4374ff;'>更多</a></span> -->
        </div>
        <div class='trains'>
        	<div class='trains_list'>
        		<div class='trains_left fl'>
        			<train-lunbo></train-lunbo>
        		</div>
        		<div class='trains_right'>
        			<train-list></train-list>
        		</div>
        	</div>
        </div>
	</div>
</template>

<script>
	import trainLunbo from './dongtai/trainslunbo.vue';
	import trainList from './dongtai/trainslist.vue';
	export	default {
		components : {
			trainLunbo,
			trainList
		}
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
	.trains{width:100%;box-sizing: border-box;}
	.trains_list{box-sizing: border-box;width:100%;overflow:hidden;padding:18px 18px 15px 18px;background-color: #fff;border:1px solid #ebebeb;}
	.trains_list .trains_left{box-sizing: border-box;width:553px;margin-right:20px;}
	.trains_list .trains_right{box-sizing: border-box;overflow: hidden}
</style>