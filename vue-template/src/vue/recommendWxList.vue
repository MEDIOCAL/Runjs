<template>
	<div class='djlvsuo swapper ptb20'>
		<div class="search_for_lvsuo">
            <div class="search_group">
                <input id="searchTextInput" class="fl" @focus="handlerInputFocus()" @blur="handlerInputBlur()" v-model="searchText">
                <span class="search_link fl" href="javascript:void(0)" @click="searchLvsuo()">搜索</span>
                <label for="searchTextInput" class="placeholder" v-show="ifPlaceholder" @click="handlerHolderclick()">全国已有<span class="red">33</span>家机构网校</label>
            </div>
        </div>
        <wx-list></wx-list>
	</div>
</template>
<script>
	import $ from 'jquery';
	import wxList from '../components/recommendWxList/wxList.vue';
	export default {
		data : function(){
			return {
				searchText : '',
				ifPlaceholder : true,
			}
		},
		methods : {
			handlerInputFocus : function(){
				this.ifPlaceholder = false; 
			},
			handlerInputBlur : function(){
				if(this.searchText){
					this.ifPlaceholder = false; 
				}else{
					this.ifPlaceholder = true;
				}
			},
			handlerHolderclick : function(){
				$('#searchTextInput').focus();
				this.ifPlaceholder = false; 
			},
			searchLvsuo : function(){

			}
		},
		mounted : function(){
			setTimeout(()=>{
				$('html, body').animate({scrollTop:0}, 'slow');
			},400)
		},
		components : {
			wxList
		}
	}
</script>
<style lang='sass'>
	.djlvsuo {
	    box-sizing: border-box;
	    padding: 10px 60px 60px;
	    background-color: #fff;
	}
	.swapper {
	    width: 1200px;
	    margin: 0 auto;
	}
	.ptb20 {
	    padding: 20px 0;
	}
	.search_for_lvsuo {
	    box-sizing: border-box;
	    width: 100%;
	    height: 55px;
	    padding: 13px 0;
	}
	.search_for_lvsuo .search_group {
	    position: relative;
	    height: 100%;
	    width: 343px;
	    border: 1px solid #d2d2d2;
	    border-radius: 3px;
	}
	.search_for_lvsuo .search_group input {
	    box-sizing: border-box;
	    height: 100%;
	    width: 298px;
	    padding-left: 10px;
	    outline: none;
	    font-size: 14px;
	    color: #909090;
	    border: none;
	    z-index: 1;
	}
	.search_for_lvsuo .search_group span.search_link {
	    display: block;
	    height: 100%;
	    line-height: 30px;
	    width: 43px;
	    text-align: center;
	    border-left: 1px solid #d2d2d2;
	    cursor: pointer;
	}
	.search_for_lvsuo .search_group label.placeholder {
	   position: absolute;
    left: 10px;
    top: 5px;
    font-size: 14px;
    color: #909090;
    cursor: text;
    z-index: 0;
	}
	.red {
	    color: red;
	}
</style>