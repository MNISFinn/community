// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  formSubmit: function() {
    const storeGoodsList = this.selectComponent('#store') // 商家商品
    const selfGoodsList = this.selectComponent('#self') // 自选商品
    console.log(storeGoodsList)
    console.log(selfGoodsList)

    // 请求下单接口
    wx.showLoading({
      title: '加载中...',
      mask: true,
      success: function() {
        wx.navigateTo({
          url: '../orderDelivering/orderDelivering',
        })
      }
    })
  }
})