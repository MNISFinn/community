// pages/communityList/communityList.js
import request from '../../utils/network'

const app = getApp()

Page({
  data: {
    // selectorVisible: false,
    list: []
  },
  onLoad: function() {
    // wx.authorize({
    //   scope: 'scope.userLocation'
    // }).then(res => {
    //   console.log(res)
    // })
    wx.getLocation({
      type: 'gcj02'
    }).then(res => {
      console.log(res)
    })
    let user_id = app.globalData.userInfo['user_id']
    request({
      url: 'get_addresses',
      method: 'POST',
      data: {
        user_id
      }
    }).then(res => {
      console.log(res)
      this.setData({
        list: res.data
      })
    }).catch(err => {

    })
  },
  onReady: function() {
    this.search = this.selectComponent("#search-community")
  },
  showSelector: function() {
    // this.setData({
    //   selectorVisible: true
    // })
    this.search.changeRange()
  }
})
