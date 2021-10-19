export default class {

  static alert(msg = '') {
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false,
      confirmColor: '#E6212A'
    })
  }
  
  static loading(msg = '加载中...', mask = true) {
    wx.showLoading({
      title: msg,
      mask: mask
    })
  }

  static close(stopPull = false, delta = 0) {
    wx.hideLoading()
    if(stopPull) {
      wx.stopPullDownRefresh()
    }
    if(back) {
      setTimeout(() => {
        wx.navigateBack({
          delta: delta
        })
      })
    }
  }

}