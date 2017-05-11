<template>
	<div>
        <ul class="trainsList">
            <li v-for='(d,index) in trainsList' v-bind:class='{"first" : index==0,"last":index==5}'>
                <div class="line_one">
                    <i class="dot fl"></i>
                    <a class="trains_item fl" target='_blank' v-bind:href="'./newsDetalPage.do#?artrcleId='+d.id+'&artrcleType='+5">{{d.title}}</a>
                    <span class="fr date">{{d.createTime | date('YYYY-MM-DD')}}</span>
                </div>
                <div class="line_two">
                    <span class="fl">
                        <i class="saw fl"></i>{{d.browse}}
                    </span>
                    <span class="fl">
                        <i class="star fl"></i>{{d.collectNum}}
                    </span>
                    <span class="fl">
                        <i class="msg fl"></i>{{d.commentNum}}
                    </span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import axios from 'axios';
    import {getLXNotice} from '../../../api/index.js';
    export  default{
        data : function(){
            return {
                trainsList : {}
            }
        },
        created : function(){
            axios[getLXNotice.method](getLXNotice.url).then( (response)=>{
                this.trainsList = response.data.result.data;
            });
        }
    }
</script>

<style lang='sass'>
 .trainsList li{box-sizing: border-box;padding-top:10px;border-bottom:1px solid #e6e6e6;overflow: hidden}
 .trainsList li:hover {background:#f3f3f3;}
 .trainsList li.first{box-sizing: border-box;margin-top:0px;}
 .trainsList li.last{border:0 none;}
 .trainsList li .dot{box-sizing: border-box;width: 4px;height: 4px;margin-right: 5px;margin-top: 10px;border-radius: 50%;background-color: #4374ff;}
 .trainsList li .trains_item{box-sizing: border-box;font-size:18px;color:#000;display:inline-block;width:456px;white-space: nowrap;overflow:hidden;text-overflow:ellipsis;}
 .trainsList li span.date{box-sizing: border-box;font-size:13px;color:#959595} 
 .trainsList li .line_one{box-sizing: border-box;overflow:auto;}
 .trainsList li .line_two{box-sizing: border-box;height:30px;line-height:30px;margin-top:2px;} 
 .trainsList li .line_two span{box-sizing: border-box;display:block;height:30px;line-height: 30px;padding:0 10px;font-size:13px;color:#959595} 
 .trainsList li .line_two i{box-sizing: border-box;display:block;width:14px;height:14px;margin: 9px 2px 0 0;} 
 .trainsList li .line_two i.saw{box-sizing: border-box;background: url("../../img/icons.png");background-position: -77px -78px} 
 .trainsList li .line_two i.star{box-sizing: border-box;background: url("../../img/icons.png");background-position: -124px -78px} 
 .trainsList li .line_two i.msg{box-sizing: border-box;background: url("../../img/icons.png");background-position: -169px -78px}
</style>