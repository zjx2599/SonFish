import Vue from 'vue'
import Vuex from 'vuex'

import path from '../config/path.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		authUserInfor: false,
		loginProvider: "",
		openid: null,
		userInfor: null, //本地存JSON数据类型，转换成String再传到数据库
		userInforTemp: null
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
			state.loginProvider = provider;
		},
		logout(state) {
			state.hasLogin = false
			state.openid = null
		},
		setOpenid(state, openid) {
			state.openid = openid
		},
		setUserInfor(state, info) {
			state.userInfor = info
		},
		setUserInforTemp(state, info) {
			state.userInforTemp = info
		},
		setAuthUserInfor(state, info) {
			state.authUserInfor = info
		}
	},
	actions: {
		//程序中使用用户信息
		//1、先检查本地缓存，如果有就直接返回数据
		//2、如果没有就去微信服务器上请求数据
		getUserInfoNormal: async function({
			state,
			commit,
			dispatch
		}) {
			return await new Promise((resolve, reject) => {
				if (state.userInfor) {
					resolve(state.userInfor)
				} else {
					uni.getUserInfo({
						provider: 'weixin',
						success: function(infoRes) {
							state.userInfor = infoRes.userInfo
							commit('setAuthUserInfor', true)
							dispatch('updateUserInfor')
							resolve(infoRes.userInfo)
						}
					})
				}
			})
		},
		//小程序启动时获取用户信息
		//1、如果获取的信息存入userInforTemp中，如本地的userInfor一致，就返回本地缓存。
		//2、如果不一致，就去微信服务器上获取，并更新本地缓存和上传数据到后台
		getUserInfOnload: async function({
			commit,
			state,
			dispatch
		}) {
			return await new Promise((resolve, reject) => {
				//1、先向微信服务器请求数据
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						//小程序启动时获取用户信息成功，将setAuthUserInfor设置为true
						commit('setAuthUserInfor', true)
						//获得临时的用户信息，和本地缓存进行比较
						commit('setUserInforTemp', infoRes.userInfo)
						//2、如果userInfor为null，说明是第一次请求，赋值后返回数据
						if (state.userInfor == null) {
							state.userInfor = state.userInforTemp
							//更新后台用户数据
							dispatch('updateUserInfor')
							resolve(state.userInfor)
							//3、如果请求到的数据和本地的不一致，则更新本地数据和后台数据
						} else if (state.userInfo != state.userInforTemp) {
							state.userInfor = state.userInforTemp
							//更新后台用户数据
							dispatch('updateUserInfor')
							resolve(state.userInfor)
							//4、直接返回数据
						} else {
							resolve(state.userInfor)
						}
					},
					//获取用户信息失败，说明用户没有授权，则跳转授权页面，并提示用户授权
					fail: () => {
						//小程序启动时获取用户信息失败，将setAuthUserInfor设置为false
						commit('setAuthUserInfor', false)
						dispatch('authUserInforFun')
					}
				})
			})
		},
		authUserInforFun: () => {
			console.log('get userInfor error')
			uni.showModal({
				title: '授权提示',
				content: '小程序需要您授权登录才能运行',
				showCancel: false,
				complete: () => {
					console.log('提示结束')
					uni.switchTab({
						url: '/pages/user/user'
					})
				}
			})
		},
		updateUserInfor: ({
			state
		}) => {
			uni.request({
				url: path.updateUserInfor,
				data: {
					openid: state.openid,
					//将userInfor转换成String，上传数据库,从数据库取到数据以后要进行 JSON.parse 再将String转换为JSON
					userInfor: JSON.stringify(state.userInfor)
				},
				header: {
					'Content-type': 'application/json'
				},
				method: 'POST',
				success: (res) => {
					console.log('update userInfor success!  ', res)
				},
				fail: (res) => {
					console.log('update userInfor fail!  ', res)
				}
			})
		},
		// lazy loading openid
		//获得openid并更新userInfor
		//flag=true 网络加载userInfor并检查用户信息更新，小程序启动的时候调用
		//flag=flase 程序内加载openid，不检查更新用户信息
		getUserOpenId: async function({
			commit,
			state,
			dispatch
		}, flag) {
			return await new Promise((resolve, reject) => {
				if (state.openid) {
					resolve(state.openid)
				} else {
					//登录获得code
					uni.login({
						success: (data) => {
							commit('login', 'weixin')
							//将code发到后台换区openid并缓存
							uni.request({
								url: path.openid,
								data: {
									code: data.code
								},
								header: {
									'Content-type': 'application/json'
								},
								method: 'POST',
								success: (res) => {
									commit('setOpenid', res.data)
									resolve(state.openid)
									//通过flag参数，控制在获取openid的时候是否需要缓存用户信息
									if (flag) {
										dispatch('getUserInfOnload')
									}
								},
								fail: (res) => {
									console.log('获取用户openID错误', res)
								}
							})
							setTimeout(() => {
								console.log(state.openid, state.hasLogin, state.loginProvider, state.authUserInfor, state.userInfor)
							}, 5000)
						},
						fail: (err) => {
							console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
							reject(err)
						}
					})
				}
			})
		}
	}
})

export default store
