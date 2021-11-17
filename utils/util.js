import request from './network'
import msg from './message'

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const checkLogin = () => {
  let token = wx.getStorageSync('token')
  let expire_time = wx.getStorageSync('expireTime')
  let current_time = new Date().getTime()
  if (!token) {
    queryLogin()
  } else {
    if (current_time > expire_time) { // token过期
      queryLogin()
    }
  }
}

const queryLogin = () => {
    let p1 = new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          // 这里也可以选择性返回需要的字段
          resolve(res)
        }
      })
    })

    let p2 = new Promise((resolve, reject) => {
      wx.getUserProfile({
        desc: '用于完善会员资料',
        success: res => {
          // 这里也可以选择性返回需要的字段
          resolve(res)
        }
      })
    })
    // 同时执行p1和p2，并在它们都完成后执行then
    Promise.all([p1, p2]).then((results) => {
      // results是一个长度为2的数组，放置着p1、p2的resolve
      let code = results[0].code
      let user_info = results[1].userInfo
      // 登录
      request({
        url: 'user_login',
        method: 'POST',
        data: {
          code,
          name: user_info['nickName'],
          avatar: user_info['avatarUrl'],
        }
      }).then(res => {
        wx.setStorageSync('token', res.data.token) // 存储token
        wx.setStorageSync('expireTime', new Date().getTime() + res.data.expires_in * 1000)
      }).catch(err => {
        console.log(err)
        msg.toast('登录失败，请重新登录', 'error')
      })
    })
}

const uploadFile = (path, bucket) => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({ //上传到服务器
    url: 'https://api.fridaysoon.asia/upload_file',
    filePath: path,//文件地址
    name: 'file',//文件name值
    formData: {
      'bucket': bucket
    },
    success: res => {
      if (res.statusCode == 200) {
        let result = JSON.parse(res.data)
        if (result.code === 0) {
          resolve(result.data)
        } else {
          msg.alert(result.msg)
          reject(result.msg)
        }
      }
    },
    fail: err => {
      let err_result = JSON.parse(err)
      msg.toast(err_result.errMsg, 'error')
      reject(err_result.errMsg)
    }
  })
  })
  
}

module.exports = {
  formatTime,
  checkLogin,
  queryLogin,
  uploadFile
}
