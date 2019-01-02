<template>
	<view class="content">
		<view class="head">
			<button v-if="!authUserInfor" class="logo" type="primary" open-type="getUserInfo" @getuserinfo="wxGetUserInfo">登录</button>
			<label v-if="!authUserInfor">请登录</label>
			<image v-if="authUserInfor" class="logo" :src="userInfor.avatarUrl"></image>
			<label v-if="authUserInfor">{{userInfor.nickName}}</label>
		</view>
		<view class="split"></view>
		<view class="detail">
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-right">
						历史订单
					</view>
				</view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-right">
						个人资料
					</view>
				</view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-right">
						意见反馈
					</view>
				</view>
				<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-right">
						售后服务
					</view>
				</view>
			</view>
		</view>

	</view>
</template>



<!--<template>
	<view> 
		<button type="primary" @click="test">test</button>
		<image class="logo" src="{{userInforLocal.avatarUrl}}"></image>
		<button class="loginButton" type="primary" open-type="getUserInfo" @getuserinfo="wxGetUserInfo">登录</button>
	</view>
</template>-->


<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'

	import path from '../../config/path.js'

	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState(['authUserInfor', 'userInfor']),
		},
		onLoad() {
			console.log('user page onload')
			this.getUserInfoNormal()
		},
		methods: {
			...mapMutations(['setAuthUserInfor', 'setUserInfor']),
			...mapActions(['updateUserInfor', 'getUserInfoNormal']),
			wxGetUserInfo(e) {
				console.log(e)
				if (e.detail.errMsg !== 'getUserInfo:ok') {
					uni.showModal({
						title: '登录失败',
						content: '请点击允许',
						showCancel: false
					})
					this.setAuthUserInfor(false)
					console.log(this.authUserInfor)
					return;
				}
				//设置用户信息授权标志
				this.setAuthUserInfor(true)
				//缓存用户信息
				this.setUserInfor(e.detail.userInfo)
				//向后台发送用户数据，存于数据库中
				this.updateUserInfor()
				console.log(this.authUserInfor)
				console.log(this.userInfor, 'user')
			},
			test() {
				console.log(this.authUserInfor)
				uni.showModal({
					content: this.authUserInfor.toString()
				})
			}
		}
	}
</script>


<style>
	.content {
		height: 800upx;
		background-image: url("http://localhost:3001/resources/pic/goods/1.jpg") no-repeat left top
	}

	.logo {
		height: 150upx;
		width: 150upx;
		margin-top: 100upx;
		margin-left: 30upx;
		border-radius: 100upx;
		background-color: #EEEEEE;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}

	.detail {
		margin-top: 50upx;
		font-size: 50upx;
	}

	.head {
		font-weight:bold;
		font-size: 30upx; 
		text-align: left;
		height: 200upx;
		width: 300upx;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
		
	}

	.split {
		background-color: #EEEEEE;
		height: 5upx;
		margin-top: 50upx;
		margin-bottom: 100upx;
	}
</style>
