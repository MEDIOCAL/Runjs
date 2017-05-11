<template>
	<div>
		<my-header></my-header>
		<my-search></my-search>
		<div class='center'>
			<transition name="fade" class="router">
				<router-view class="r"></router-view>
			</transition>
		</div>
		<my-footer></my-footer>	
	</div>
	
</template>
<script>
	import myHeader from './components/app/header.vue';
	import myFooter from './components/app/footer.vue';
	import mySearch from './components/app/search.vue';
	export default{
		components : {
            myHeader,
            myFooter,
            mySearch
        },
        methods : {
        	
        }
	}
</script>
<style lang="sass">
	body{
		width:100%;
	}
	html{
		width:100%;
	}
	.center{
		width:1200px;
		margin:auto;
		margin-top:10px;
		overflow:hidden;
	}
	.fade-enter-active, .fade-leave-active {
		transition: all .3s ease;
		transform: translateX(0px);
	}
	.fade-enter, .fade-leave-active {
		transform: translateX(-100%);
		opacity: 0;
	}
	.r {
		width: 100%;
		position: relative;
	}
	.router {
		width: 100%;
		margin:auto;
		/*transform: translateX(-300px);*/
		/*position: absolute;*/
		/*transition: all .9s cubiz-bezier(.55, 0, .1, 1);*/
	}
</style>