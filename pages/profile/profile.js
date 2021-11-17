// pages/profile/profile.js
// 获取应用实例
const app = getApp()

import request from '../../utils/network'

Page({
  data: {
    userData: {},
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: false 
    // canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
    }
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onShow() {
    let token = wx.getStorageSync('token')
    if (token) {
      request({
      url: 'user_info',
      method: 'POST',
    }).then(res => {
      console.log(res)
      let user = {
        avatarUrl: res.data.avatar,
        nickName: res.data.user_name
      }
      this.setData({
        userData: res.data,
        userInfo: user,
        hasUserInfo: true
      })
      app.globalData.userInfo = res.data  // 存储全局变量
    }).catch(err => {
      console.log(err)
    })
    }
  },
  getUserProfile(e) {
    let user = {}
    let p1 = new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          // 这里也可以选择性返回需要的字段
          resolve(res)
        }
      })
    })

    let p2 = new Promise((resolve, reject) => {
      wx.getUserProfile({
        desc: '用于完善会员资料',
        success: res => {
          // 这里也可以选择性返回需要的字段
          resolve(res)
        }
      })
    })
    // 同时执行p1和p2，并在它们都完成后执行then
    Promise.all([p1, p2]).then((results) => {
      wx.removeStorageSync('token')
      // results是一个长度为2的数组，放置着p1、p2的resolve
      let code = results[0].code
      let user_info = results[1].userInfo
      // 登录
      request({
        url: 'user_login',
        method: 'POST',
        data: {
          code,
          name: user_info['nickName'],
          avatar: user_info['avatarUrl'],
        }
      }).then(res => {
        user = {
          avatarUrl: res.data.user_info.user_avatar,
          nickName: res.data.user_info.user_name
        }
        this.setData({
          userData: res.data.user_info,
          userInfo: user,
          hasUserInfo: true
        })
        app.globalData.userInfo = res.data.user_info  // 存储全局变量
        wx.setStorageSync('token', res.data.token) // 存储token
        wx.setStorageSync('expireTime', new Date().getTime() + res.data.expires_in * 1000)
      }).catch(err => {
        console.log(err)
      })
    })

    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    // wx.getUserProfile({
    //   desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    //   success: (res) => {
    //     console.log(res)
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // })
  },
  test() {
    console.log('test')
  },
  improveInfo() {
    let _that = this
    wx.navigateTo({
      url: '../info/info',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: _that.data.userData })
      }
    })
  },
  onSendOrder(e) {
    wx.navigateTo({
      url: '../order/order',
    })
  },
  onSearch(e) {
    wx.navigateTo({
      url: '../settings/settings',
    })
  },
  onRegister(e) {
    wx.navigateTo({
      url: '../register/register',
    })
  },
})