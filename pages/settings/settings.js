// pages/settings/settings.js
import request from '../../utils/network'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  toInfo() {
    request({
      url: 'user_info',
      method: 'POST'
    }).then(res => {
      console.log(res.statusCode)
      if(res.statusCode == 401) {
        console.log(2222)
        wx.getUserProfile({
          desc: '用于完善会员资料',
          success: res => {
            // 这里也可以选择性返回需要的字段
            wx.navigateTo({
              url: '../info/info',
            })
          }
        })
      } else {
        wx.navigateTo({
          url: '../info/info',
        })
      }
    })
  }
})