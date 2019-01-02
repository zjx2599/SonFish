<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'

	export default {
		data() {
			return {
				provider: 'weixin',
			}
		},
		computed: {
			//通过mapState获取的缓存数据通过this是只读的属性，需要调用mutation中的方法进行修改
			...mapState(['openid']), 
		},
		methods: {
			...mapMutations(['login']),
			...mapActions(['getUserOpenId'])
		},
		//小程序启动时进行登录操作（登录操作需要联网，从微信服务器获得code），并与后台交互，获得openId存到store中。
		//启动时还需要获取用户信息，并保存到本地，每次获取用户信息后都与本地信息进行比对，如果不一致就提交后台更新
		onLaunch: function() {
			//登录
			uni.login({
				provider: this.provider,
				success: (res) => {
					this.login(this.provider)
				},
				fail: (e) => {
					console.log('fail', e)
				}
			})
			//获得openId，存储到store中，true缓存用户信息
			this.getUserOpenId(true)	
		},
		onShow: function() {

		},
		onHide: function() {

		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/uni.css";
</style>
