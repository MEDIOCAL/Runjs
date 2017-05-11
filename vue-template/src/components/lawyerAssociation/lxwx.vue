<template>
	<div style='overflow:hidden;'>
		<a v-for='(d,index) in lxwxData' v-bind:href="'/wxqt/wangxiao.do?id='+d.id" target='blank' class='lsxy' @mouseenter='onmouse(index,1)' @mouseleave='onmouse(index,0)' v-bind:class='{"on" : (index+1)%4==0}'>
			<div style="position:absolute;width:100%;height:100%;z-index:2" class='leavemouse'>
				<div class='bg-img'>
					<img v-bind:src="'http://www.zfwx.com'+d.wxImageFj">
				</div>
			</div>
			<div class='onmouse' style='display:none'>
				<div class='bg-img'><img v-bind:src="'http://www.zfwx.com'+d.logo"></div>
				<div class='datas'>
					<span>学员 <i>{{d.stuNum}}</i></span>
					<span>课程 <i>{{d.courseNum}}</i></span>
					<span>好评 <i>{{d.commentNum}}</i></span>
				</div>
			</div>
		</a>
	</div>
</template>

<script>
  import $ from 'jquery';
	export default {
		props : ['lxwxData'],
		methods : {
			onmouse : function(index,b){
        if(b){
           $('.lsxy').find('.onmouse').eq(index).css('display','block');
           $('.lsxy').find('.leavemouse').eq(index).css('display','none');
         }else{
           $('.lsxy').find('.onmouse').eq(index).css('display','none')
           $('.lsxy').find('.leavemouse').eq(index).css('display','block')
         }
				
			}
		},
    mounted : function(index){
      
    }
	}
</script>

<style lang='sass'>
	/*律师学院 -------- start*/
  .lsxy{
  	display:block;
    width:277px;
    height:130px;
    position:relative;
    border:1px solid #dfdfdf;
    cursor:pointer;
    float:left;
    margin-right: 25px;
    margin-bottom: 30px;
  }
  .lsxy.on{
  	margin-right:0px; 
  }
  .lsxy .bg-img{
    position:absolute;
    left:0px;
    top:0px;
    width:277px;
    height:130px;
    z-index:10;
  }
  .lsxy .bg-img img{
    /*width:100%;
    height:100%;*/
    display:block;
    margin: auto;
  }
  .lsxy .title{
    position:absolute;
    left:0px;
    top:0px;
    width:247px;
    height:30px;
    padding:50px 15px;
    z-index:20;
    text-align: center;
    line-height:30px;
    color:#fff;
    font-size:28px;
    text-shadow: 1px 1px #666;
  }
  .lsxy .onmouse{
    width:100%;
    height:100%;
    position:absolute;
    z-index:10;
  }
  .lsxy .onmouse .bg-img img{
        margin-top: 52px;
        width:80%;
  }
  .lsxy .datas{
    width:237px;
    height:32px;
    line-height:32px;
    position: absolute;
    top:0px;
    left:0px;
    padding:0 20px;
    z-index:20;
    background:#4374ff;
  }
  .lsxy .datas span{
    display:inline-block;
    float: left;
    width:78px;
    height:32px;
    color:#fff;
  }
/*律师学院 -------- end*/
</style>