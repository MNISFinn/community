// pages/messageList/messageList.js
import request from '../../utils/network'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let user_id = options.user_id
      request({
        url: 'msg/list?user_id='+user_id,
        method: 'GET',
      }).then(res => {
        let list = res.data.data
        this.setData({
          list
        })
      }).catch(err => {
        console.log(err)
      })
  },

  toChat: function(event) {
    let user_id = event.currentTarget.dataset.user_id
    wx.navigateTo({
      url: '../messages/messages?user_id='+user_id,
    })
  }
})