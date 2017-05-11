<template>
	<div>
        <div class="lunbo">
            <ul class="pics">
                <li class="fl" v-for="train in trains">
                    <a @click="openAd(train.adUrl)" >
                        <img v-bind:src="'http://www.zfwx.com'+train.adImg" alt="">
                    </a>
                </li>
            </ul>
            <ul class="icons">
                <li class="fl" v-bind:class="{current:index==0}" v-for="(train,index) in trains" @click="switchPicture(index)"></li>
            </ul>
        </div>
        <div class="trains_courseInfo">
            <ul class="trains_courseInfoContainer" >
                <li class="fl" v-for="train in trains">
                    <p class="courseName" ><a @click="openAd(train.adUrl)">{{train.adTitle}}</a></p>
                    <p class="courseInfo" >{{train.adSummary}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { getDjAdvert } from '../../../api/index.js';
    import $ from 'jquery';
	export	default {
        data : function(){
            return {
                trains : {},
                index  : 0
            }
        },
        methods : {
            openAd : function(){

            },
            switchPicture : function(index){
                this.index = index;
                let pics  = $(this.$el).find('.pics'),
                    conts = $(this.$el).find('.trains_courseInfoContainer');

                pics.animate({'left':'-'+this.index*553+'px'},300);
                conts.animate({'left':'-'+this.index*553+'px'},300);
                $(this.$el).find('.icons li').removeClass('current').eq(this.index).addClass('current');
            }
        },
        created : function(){
            axios[getDjAdvert.method](getDjAdvert.url).then( (response)=>{
                this.trains = response.data.result.data;
            }); 
        },
        mounted : function(){
            let pics  = $(this.$el).find('.pics')
               ,conts = $(this.$el).find('.trains_courseInfoContainer')
               ,lunbo = $(this.$el).find('.lunbo')
               ,timer = null;
            timer = setInterval(() => {
                if(this.index < this.trains.length-1){
                    this.index++;
                }else{
                    this.index=0;
                }
                pics.animate({'left':'-'+this.index*553+'px'},300);
                conts.animate({'left':'-'+this.index*553+'px'},300);
                $(this.$el).find('.icons li').removeClass('current').eq(this.index).addClass('current');
            },3000);

            lunbo.mouseenter(()=>{
                clearInterval(timer);
            }).mouseleave(()=>{
                timer = setInterval(() => {
                    if(this.index < this.trains.length-1){
                        this.index++;
                    }else{
                        this.index=0;
                    }
                    pics.animate({'left':'-'+this.index*553+'px'},300);
                    conts.animate({'left':'-'+this.index*553+'px'},300);
                    $(this.$el).find('.icons li').removeClass('current').eq(this.index).addClass('current');
                },3000);
            }); 
        }
    }
</script>

<style lang='sass'>
    .lunbo{box-sizing: border-box;position:relative;width:553px;height:300px;overflow:hidden }
    .lunbo ul.pics{position:absolute;box-sizing: border-box;width:100000px;height:100%;overflow: hidden}
    .lunbo ul.pics li{box-sizing: border-box;width:553px;height:100%;}
    .lunbo ul.pics li a{display:block;height:300px;cursor:pointer;}
    .lunbo ul.pics li img{width:100%;height:100%;}
    .lunbo ul.icons{box-sizing: border-box;position: absolute;bottom:10px;right:10px;overflow: auto}
    .lunbo ul.icons li{box-sizing: border-box;border:1px solid #ccc;width:15px;height:15px;background-color: #fff;border-radius:50%;cursor: pointer;margin-right:10px;}
    .lunbo ul.icons li.current{box-sizing: border-box;width:15px;height:15px;background-color: #4374ff;border-radius:50%;cursor: pointer}
    .trains_courseInfo {position:relative;width:100%;height:108px;overflow: hidden}
    .trains_courseInfo ul{position:absolute;width:100000px;height:108px;}
    .trains_courseInfo ul li{width:553px;height:108px;overflow: hidden}
    .trains_courseInfo ul li:hover{background:#f3f3f3;}
    /*.trains_list .trains_left .trains_courseInfo ul li:hover .courseName a{color:#0756e3;}
    .trains_list .trains_left .trains_courseInfo ul li:hover .courseInfo{color:#0756e3;}*/
    .trains_courseInfo p.courseName{box-sizing: border-box;line-height:38px;font-size:20px;color:#000000;padding:0 3px;overflow:hidden;white-space: nowrap;text-overflow:ellipsis;}
    .trains_courseInfo p.courseName a{color:#000000;cursor: pointer;}
    .trains_courseInfo p.courseInfo{box-sizing: border-box;width:100%;font-size:13px;color:#959595;line-height:20px;height:60px;padding:0 3px;}
</style>