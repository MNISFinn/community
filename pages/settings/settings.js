// pages/settings/settings.js
import request from '../../utils/network'
import util from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  async toInfo() {
    await util.checkLogin()
    request({
      url: 'user_info',
      method: 'POST'
    }).then(res => {
      console.log('rrrr',res)
      wx.navigateTo({
        url: '../info/info',
      })
    }).catch(r => {
      console.log(r)
    })
  }
})