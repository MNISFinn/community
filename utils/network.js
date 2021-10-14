import baseURL from './baseURL';

export default function request (options) {
  let token = wx.getStorageSync('token')
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL+options.url,
      header: {'Authorization': 'Bearer ' + token},
      method: options.method || 'GET',
      data: options.data || {},
      success: resolve,
      fail: reject
    })
  })
}