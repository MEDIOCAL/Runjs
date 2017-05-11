<template>
	<div>
		<div class="lvsuo_list_recommend">
	        <ul>
	            <a v-bind:href="'http://www.zfwx.com/wxqt/wangxiao.do?id='+item.link" v-for="(item,index) in demo.lvsuologos" target="_blank">
	                <li class="fl lvsuologo" v-bind:class="{first:index%4==0,last:index%4==3}" v-bind:style="'background:url(http://www.zfwx.com'+item.fullname+') no-repeat center;background-size:80%'"></li>
	            </a>
	        </ul>
	        <div v-if="demo.ifShowMore">
	            <span class="morelogos fr" @click="morelogos()" v-show="demo.more">更多 &gt;&gt;</span>
	            <span class="morelogos fr" @click="lesslogos()" v-show="!demo.more">收起 &lt;&lt;</span>
	        </div>
	    </div>
	    <div class="lvsuo_list_all">
		    <h4 class="list_title">按品牌首字母选择</h4>
		    <div>
		        <div class='vertical line1'></div>
		        <div class='vertical line2'></div>
		        <div class='vertical line3'></div>
		        <div class="lvsuoContainer" v-for="letterItem in demo.items">
		            <div class="letter_container fl left">
		                <p class="letter">{{letterItem.letter}}</p>
		            </div>
		            <div class="lvsuolist_container right">
		                <ul>
		                    <li v-for="(lvsuo,index) in letterItem.list" v-bind:class='{first:(index+1)%4==1}'>
		                        <a  v-show="lvsuo.link==null" href="javascript:void(0)" target='_self' @mousemove="overInfo()" @mouseleave="leaveInfo()">{{lvsuo.fullname}}</a>
		                        <a  v-show="lvsuo.link!=null" v-bind:href="'/wangxiao.do?id='+lvsuo.link" target='_blank' class="exist" v-bind:title='lvsuo.fullname'>{{lvsuo.fullname}}</a>
		                    </li>
		                </ul>
		            </div>
		        </div>
		    </div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios';
	import {getLvsuo} from '../../../api/index.js';
	export default {
		data : function(){
			return {
				demo : {
					lvsuologos : {},
					ifShowMore : false,
					more  : true,
					items : [
						{
							letter : '',
							list   : {}
						}
					]
				},
				lvsuoList  : {}
			}
		},
		methods : {
			lesslogos : function(){
				// this.demo.lvsuologos = this.demo.lvsuologos.splice(0,8);
				this.demo.lvsuologos = this.splices(this.demo.lvsuologos,8);
				this.demo.more = true;
			},
			morelogos : function(){
				let data = this.lvsuoList;
				this.demo.lvsuologos = data;
				this.demo.more = false;
			},
			splices : function(data,num){
				var newData = [];
				data.map((item,index)=>{
					if(index < num){
						newData[index] = item;
					}
				});
				return newData;
			},
			leaveInfo : function(){

			},
			overInfo : function(){

			},
			getDatas : function(){
				axios[getLvsuo.method](getLvsuo.url).then( (response)=>{
					this.lvsuoList       = response.data.lvsuologo.datas;
					this.demo.lvsuologos = response.data.lvsuologo.datas;
					this.demo.items = response.data.lvsuolist.datas;
					if(this.lvsuoList.length > 8){
						this.demo.ifShowMore = true;
					}else{
						this.demo.ifShowMore = false;
					}
					this.lesslogos();
				});
			}
		},
		mounted : function(){
			this.getDatas();
		}
	}
</script>
<style lang='sass'>
	.lvsuo_list_recommend, .lvsuo_list_recommend ul, .lvsuo_list_all {
	    width: 100%;
	    overflow: auto;
	}
	.lvsuo_list_recommend ul li.first {
	    margin: 10px 10px 10px 0;
	}
	.lvsuo_list_recommend ul li.last {
	    margin: 10px 0 10px 10px;
	}
	.lvsuo_list_recommend ul li {
	    box-sizing: border-box;
	    width: 254px;
	    height: 130px;
	    border: 1px solid #e5e5e5;
	    margin: 10px;
	}
	.lvsuo_list_recommend ul li:hover{
	    border-color:#4374ff;
	    cursor: pointer;
	}
	.djlvsuo {
	    box-sizing: border-box;
	    padding: 10px 60px 60px;
	    background-color: #fff;
	}
	.morelogos {
	    color: #666;
	    cursor: pointer;
	    margin-right: 12px;
	}
	.list_title{
    line-height:50px;
    font-family: "宋体", sans-serif;
}
.lvsuo_list_all .vertical{
    position:absolute;
    top:0px;
    left:0px;
    width:0px;
    height:100%;
    border-right:1px solid #e8e8e8;
}
.lvsuo_list_all .line1{
    left:254px;
}
.lvsuo_list_all .line2{
    left:527px;
}
.lvsuo_list_all .line3{
    left:801px;
}
.lvsuo_list_all{
    margin-top:22px;
    position: relative;
}
.lvsuo_list_all  .lvsuoContainer{
    width:100%;
    overflow: auto;
}
.lvsuo_list_all  .lvsuoContainer p.letter{
    margin:0;
    padding:0;
    height:100%;
    line-height:30px;
}
.lvsuoContainer .letter_container{
    width:30px;
}
.lvsuoContainer .letter_container p{
    text-align:center;
    line-height:30px;
    font-size:16px;
    font-weight: bold;
}
.lvsuoContainer .lvsuolist_container{
    overflow: hidden;
}
.lvsuoContainer .lvsuolist_container ul li.first{
    width:224px;
}
.lvsuoContainer .lvsuolist_container ul li{
    width:272px;
    box-sizing:border-box;
    padding:0 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
    text-align:left;
    line-height:30px;
    float:left;
}
.lvsuoContainer .lvsuolist_container ul li a{
    color:#151ca2
}
.lvsuoContainer .lvsuolist_container ul li a.exist:hover{
    color:#ff0000;
    text-decoration: underline;
}
.morelogos{color:#666;cursor:pointer;margin-right:12px;}


.wx-courselist{width:1198px;margin:auto;margin-top: 10px;}
</style>