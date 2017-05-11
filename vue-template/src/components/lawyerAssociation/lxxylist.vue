<template>
	<div class='xy-list'>
		<div class='xy-left'>
			<img v-bind:src="myData.logo">
		</div>
		<div class='xy-right'>
			<h3 class='xy-title'><a v-bind:href="'/wxqt/wangxiao.do?id='+myData.id"  target='blank'>{{myData.bottom}}</a></h3>
			<ul class='list' v-for='d in myData.djWxs'>
				<li><a v-bind:href="'/wxqt/wangxiao.do?id='+d.id" v-bind:title='d.bottom' target='blank'>{{d.bottom}}</a></li>
			</ul>
			<i class='shodow'></i>
		</div>
	</div>
</template>
<script>
	export default{
		props :["myData"]
	}
</script>
<style lang='sass'>
	/*市级学院列表 ---- start*/
	  .xy-list{
	    width:560px;
	    height:110px;
	    padding:10px;
	    border:1px solid #ccc;
	    position:relative;
	    float:left;
	    margin-top: 20px;
	  }
	  .xy-left{
	    width:160px;
	    height:109px;
	    float:left;
	  }
	  .xy-left img{
	    width:100%;
	    height:100%;
	  }
	  .xy-right{
	    float:right;
	    width:390px;
	    height:109px;
	  }
	  .xy-title{
	    height:36px;
	    line-height:36px;
	    font-size:16px;
	    font-weight:bold;
	    color:#4374ff;
	    border-bottom:1px solid #ccc;
	  }
	  .xy-list .list{
	    margin-top:15px;
	    padding:0 5px;
	  }
	  .xy-list .list li{
	    float:left;
	    width:120px;
	    margin-right:5px;
	    margin-bottom:7px;
	    font-size:14px;
	    white-space: nowrap;
	    overflow: hidden;
	    text-overflow:ellipsis;
	  }
	  .xy-list .list a{
	    color:#616161;
	  }
	  .xy-list .shodow{
	    background:url('../../img/xylist_bg.png') no-repeat;
	    display:inline-block;
	    width:250px;
	    height:10px;
	    position:absolute;
	    left: 0px;
	    bottom:-11px;
	  }
	/*市级学院列表 ---- end*/	
</style>