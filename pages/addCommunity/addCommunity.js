// pages/addCommunity/addCommunity.js
let qqmap_sdk = require('../../utils/qqmap/qqmap-wx-jssdk')
let qqmap = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 0.00,
    longitude: 0.00,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // qqmap = new qqmap_sdk({
    //   key: 'USMBZ-3FMRV-LSEPR-UMKA2-KUOW5-CXFH4'
    // })
    // let _that = this
    wx.authorize({
      scope: 'scope.userLocation'
    }).then(res => {
      console.log(res)
    })
    // wx.getLocation({
    //   type: 'gcj02',
    //   success (res) {
    //     let latitude = res.latitude
    //     let longitude = res.longitude
    //     // console.log(latitude, longitude)
    //     _that.setData({
    //       latitude,
    //       longitude
    //     })
    //     // 获取用户当前位置
    //     _that.getUserLocation()
    //   }
    //  })
     
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
    // 调用接口
    // qqmap.search({
    //   keyword: '酒店',
    //   success: function (res) {
    //       console.log(res);
    //   },
    //   fail: function (res) {
    //       console.log(res);
    //   },
    //   complete: function (res) {
    //       console.log(res);
    //   }})
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
  getUserLocation: function() {
    let _that = this
    let latitude = _that.data.latitude
    let longitude = _that.data.longitude
    qqmap.reverseGeocoder({ //逆地址解析（经纬度 ==> 坐标位置）
      location: {
        latitude,
        longitude
      },
      success(res) {
        console.log(res)
        _that.setData({
          // province:res.result.ad_info.province,
          city:res.result.ad_info.city,
          // district:res.result.ad_info.district
        })
      }
    })
  },
})