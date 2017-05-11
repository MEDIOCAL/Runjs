<template>
	<div class='footer-wrap'>
		<div class='footer'>
			<div class='foot'>
				<p class='beian'>北京市公安局海淀分局备案：11010802010795 京ICP备05069141号</p>
				<p class='banquan'>2016©点睛网版权所有</p>

				<div class='right fr'>
					<div>
						<a href="http://www.zfwx.com/about.jsp"  target='blank' class='bpr'>关于我们</a>
						<a href="http://www.zfwx.com/joinus.jsp" target='blank' class='bpr ml10'>招聘英才</a>
						<a href="" class='bpr ml10'>加入收藏</a>
						<a href="http://cas.zfwx.com/login?service=http://www.zfwx.com/wxgr/myRoute.do?params=zxcz" class='bpr ml10' target='_blank'>充值中心</a>
						<a href="http://www.zfwx.com/contactus.jsp" class='ml5'>联系我们</a>
					</div>
					<p class='phone'>客服电话: <span>010-62275399/62210155</span></p>
					<p class='email'>网课销售: <span>010-62276686</span></p>
					<p class='email'>投稿邮箱: <span>djlw@zfwx.com</span>客服QQ: <span>635587880</span></p>
					<div class='kehuduan'>
						<span class='kehu'>客户端：</span>
						<span class='apple icon_cli'>
							<div class="code1 pos_a code"> 
	                            <div class="in_code">
	                                <img src="../../img/erweimaxz0.png">      
	                                <span></span>       
	                            </div>
	                        </div>
						</span>
						<span class='android  icon_cli'>
							<div class="code2 pos_a code">
	                            <div class="in_code">
	                                <img src="../../img/erweimaxz.png">  
	                                <span></span>
	                            </div>
	                        </div>
						</span>
						<span class='guanzhu'>关注我们：</span>
						<span class='weibo  icon_cli'>
							<div class="code3 pos_a code">
	                            <div class="in_code">
	                                <img src="../../img/erweimaxz2.png"> 
	                                <span></span>
	                            </div>      
	                        </div>
						</span>
						<span class='weixin  icon_cli'>
							<div class="code4 pos_a code">
	                            <div class="in_code">
	                                <img src="../../img/erweimaxz3.png">
	                                <span class="last"></span>
	                            </div>
	                        </div>
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {

	}
</script>
<style lang='sass'>
/*尾部 ------------ start*/
.footer{
    font-size:12px;
}
    .footer-wrap{
        width:100%;
        height:266px;
        background:#4374ff;
        position:relative;
        z-index:9998;
    }
    .footer-wrap .footer{
        width:100%;
        height:266px;
        background:url('../../img/footer_bg.png') no-repeat center center;
    }
    .footer-wrap .foot{
        width:1198px;
        height:266px;
        margin: auto;
        position:relative;
    }
    .footer-wrap .foot a{
        color:#d3dbfe;;
    }
    .footer-wrap .foot a:hover{
        color:#fff;;
    }
    .footer-wrap .beian{
        position: absolute;
        left: 0px;
        bottom:70px;
        color:#8ca5ff;
    }
    .footer-wrap .banquan{
        position: absolute;
        left: 0px;
        bottom:20px;
        color:#fff;

    }
    .footer-wrap .right{
        height:186px;
        padding-top:80px;
    }
    .footer-wrap .bpr{
        padding-right:10px;
        color:#d3dbfe;
        border-right:2px solid #7c9eff;
    }
    .footer-wrap .phone{
        margin-top: 30px;
        color:#fff;
    }
    .footer-wrap .email{
        margin-top:10px;
        color:#fff;
    }
    .footer-wrap .kehuduan{
        margin-top:25px;
        color:#fff;
    }
    .footer-wrap .kehuduan span{
        position:relative;
    }
    .kehu{
        float:left;
        display:inline-block;
        margin-right:10px;
    }
    .footer-wrap .apple{
        float:left;
        width:24px;
        height:24px;
        display:inline-block;
        margin-right:10px;
        background:url(../../img/icon_1.png) no-repeat -1px -241px;
        cursor:pointer;
    }
    .footer-wrap .android{
        float:left;
        width:24px;
        height:24px;
        display:inline-block;
        margin:0 10px 0 0;
        background:url(../../img/icon_1.png) no-repeat  0px -305px;
        cursor:pointer;
    }
    .footer-wrap .guanzhu{
        float:left;
        display:inline-block;
        margin-right:10px;
    }
    .footer-wrap .weibo{
        float:left;
        width:24px;
        height:24px;
        display:inline-block;
        margin-right:10px;
        background:url(../../img/icon_1.png) no-repeat  0px -368px;
        cursor:pointer;
    }
    .footer-wrap .weixin{
        float:left;
        width:24px;
        height:24px;
        display:inline-block;
        margin-right:10px;
        background:url(../../img/icon_1.png) no-repeat  0px -429px;
        cursor:pointer;
    }
    .code1{
        left:5px;
        top:-192px;
    }
    .code2{
        left:5px;
        top:-195px;
    }
    .code3{
        left:-4px;
        top:-195px;
    }
    .code4{
        left:-4px;
        top:-195px;
    }
    .in_code{
        box-shadow: 1px 1px 3px rgba(0,0,0,.5);
        border-radius:6px;
        -webkit-border-radius:6px;
        -moz-border-radius:6px;
        -ms-border-radius:6px;
        position:relative;
        z-index:21;
        height:180px;
    }
    .in_code img{
        border-radius:6px;
        -webkit-border-radius:6px;
        -moz-border-radius:6px;
        -ms-border-radius:6px;
        position:relative;
        z-index:21;

    }
    .code{
        display:none;

    }

    .code span{
        border:8px solid transparent;
        border-width:8px;
        border-color:transparent;
        border-style:dashed;
        border-right-style:solid;
        border-right-color:#fff;
        position:absolute;
        bottom:23px;
        left:2px;
        z-index:20;
        *overflow:hidden;
    }
    .code span.last{
        bottom:24px;
        right:20px;
    }
    .pos_a{
        position: absolute;
    }
/*尾部 ------------ end*/
</style>