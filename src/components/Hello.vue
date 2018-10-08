<template>
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange"       :bottom-method="loadBottom" 
      @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">      
        		<ul v-for="item in list">
	        		<li>{{item.title}}</li>        		
	        	</ul>
	        	<div slot="top" class="mint-loadmore-top">
		          <div v-show="topStatus !== 'loading'" >
		              <span v-if="topStatus === 'drop'">释放刷新</span>
		              <span v-else>下滑</span>
		              <span :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>         
		          </div>       
		          <span v-show="topStatus === 'loading'">
		            <mt-spinner type="snake"></mt-spinner>
		          </span>
		        </div>    
		        <div slot="bottom" class="mint-loadmore-bottom">     
		          <div v-show="bottomStatus !== 'loading'">
		             <span :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
		             <span v-if="bottomStatus === 'drop'">释放加载</span>
		             <span v-else>上滑</span>
		          </div>
		          <span v-show="bottomStatus === 'loading'">
		            <mt-spinner type="snake"></mt-spinner>
		          </span>
		        </div>

      </mt-loadmore>
    </div>

</template>
<style>
.loading-background, .mint-loadmore-top span {
    -webkit-transition: .2s linear;
    transition: .2s linear
}
.mint-loadmore-top span {
    display: inline-block;
    vertical-align: middle
}
.mint-loadmore-top span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
}
.page-loadmore .mint-spinner {
    display: inline-block;
    vertical-align: middle
}
.page-loadmore-wrapper {
    overflow: scroll
}
.mint-loadmore-bottom span {
    display: inline-block;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    vertical-align: middle
}
.mint-loadmore-bottom span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
}
li{
	border-bottom: 2px solid red;
	font-size: 40px;
	text-align: center;
  padding: 80px 0;

}
p{
	background: red;
	text-align: center;
  padding: 20px 0;
  height: 100px;
  line-height: 100px;
  font-size: 30px;
  color: white;
}
</style>
<script type="text/babel">
  export default {
    data() {
      return {
        allLoaded: false,
        bottomStatus: '',
        wrapperHeight: 0,
        topStatus: '',
        list:[],
        page:0,
        pageTotal:'',
        bottomLoadingText:"加载中...",
        show:true
      };
    },
    methods: {
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      loadBottom() {
        setTimeout(() => {
          this.$refs.loadmore.onBottomLoaded();
        }, 1500);
        console.log('下拉加载')
        if(this.page<this.pageTotal){
        	this.page=this.page+1
        	this.getAllNews()
        }else{
        	console.log('完了')
        	this.bottomLoadingText='我也是有完的...'
        	this.show=false
        }
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      loadTop() {
        setTimeout(() => {
          this.$refs.loadmore.onTopLoaded();
        }, 1500);
        console.log('上拉加载')
      },
      getAllNews(){  //全部
	      this.$axios({  
	      method: 'post',
	      data:{
	       do:'xinwen_all',
	       weid:108,
	       page:this.page,
	       psize:7,
	       act:'all',
//	       openid:this.$store.state.openid,
	      },
	      }).then(res=>{
	        console.log(res)
	        this.pageTotal=res.data.pageTotal
//	        console.log(this.$store.state.weid)
	        this.list=this.list.concat(res.data.datas)
	      }) 
    },
   
},
 mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
      this.getAllNews()
    }
  };
</script>