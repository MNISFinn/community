// pages/register.js
import msg from '../../utils/message'
import util from '../../utils/util'
import request from '../../utils/network'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id: 0,
    mobile: '',
    email: '',
    id_card_front: '',
    id_card_back: '',
    selectorVisible: false,
    community_info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.selectComponent('#community-selector').myField)
    let userInfo = app.globalData.userInfo
    if (userInfo == null) {
      msg.toast('请先登录')
      wx.switchTab({
        url: '../profile/profile',
      })
    } else {
      this.setData({
        user_id: userInfo['user_id'],
        mobile: userInfo['mobile'],
        email: userInfo['email']
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.search = this.selectComponent("#community-selector")
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

  /**
   * 上传身份证正面
   */
  uploadFront: function() {
    let _that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const path = res.tempFilePaths[0]
          util.uploadFile(path, 'id-card').then(res => {
            _that.setData({
              id_card_front: res
            })
          })
      }
    })    
  },

  /**
   * 上传身份证反面
   */
  uploadBack: function() {
    let _that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const path = res.tempFilePaths[0]
          util.uploadFile(path, 'id-card').then(res => {
            _that.setData({
              id_card_back: res
            })
          })
      }
    })
  },
  formSubmit: function(e) {
    let info = e.detail.value
    console.log(info)
    request({
      url: 'deliver_register',
      method: 'POST',
      data: {
        user_id: this.data.user_id,
        true_name: info['true_name'],
        mobile: info['mobile'],
        email: info['email'],
        id_card: info['id_card'],
        id_card_front: this.data.id_card_front,
        id_card_back: this.data.id_card_back,
        community_id: this.data.community_info.id
      }
    }).then(res => {
      console.log(res)
      msg.toast(res.message)
    }).catch(err => {

    })
  },
  showSelector: function() {
    this.setData({
      showModalStatus: true
    })
  },
  /**
   * 选择小区后回传到页面
   * @param {*} event 
   */
  showCommunity: function(event) {
    console.log(event.detail.community_info)
    this.setData({
      community_info: event.detail.community_info
    })
  }
})