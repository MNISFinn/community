// pages/orderDelivering/orderDelivering.js
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  uploadImg: function() {
    let _that = this
    wx.chooseImage({
      count: 2,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.uploadFile({ //上传到服务器
          url: 'https://api.fridaysoon.asia/upload_file',
          filePath: tempFilePaths[0],//文件地址
          name: 'file',//文件name值
          formData: {
            'bucket': 'order-goods'
          },
          success: function (res) {
            console.log(res)
          },
          error: function(e) {
            console.log(e)
          }
        })
        
        // request({
        //   url: 'upload_file',
        //   method: 'POST',
        //   data: {
        //     files: tempFilePaths,
        //     bucket: 'order-goods'
        //   }
        // }).then(res => {
        //   console.log(res)
        //   _that.setData({
        //   list: res.data
        // })
        // }).catch(err => {
        //   console.log(err)
        // })
        
      }
    })
  }
})