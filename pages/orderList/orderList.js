// pages/orderList/orderList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swipercurrent: 0
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
  //获取当前tab的current值赋值给swiper的current
  getTabIndex(e) {
    this.setData({
        swipercurrent: e.detail.TabcurrentIndex
    })
  },
  //滑动内容，设置Tab跟着一起变化
  swipercurrentchange(e) {
      const tabcontrol = this.selectComponent('#TestTabComponent')
      tabcontrol.setData({
          currentIndex: e.detail.current
      })
  }
})