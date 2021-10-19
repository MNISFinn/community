import config from './config';
import msg from './message';

/**
 * 验证是否需要token
 * @param {*} path 
 */
function checkPath(path) {
  const index = config.requestExclude.indexOf(path)
  return index < 0
}

async function getToken() {
  const currentTime = parseInt(new Date().getTime() / 1000)
  const expireTime = wx.getStorageSync('expireTime')
  if (currentTime < expireTime) {
    return wx.getStorageSync('token')
  } else {
    try {
      return await getTokenByServer()
    } catch (e) {
      return ''
    }
  }
}

function getTokenByServer() {
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
    wx.removeStorageSync('token')
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
      }
    }).then(res => {
      console.log(res)
      wx.setStorageSync('token', res.data.data.token) // 存储token
      wx.setStorageSync('expireTime', new Date().getTime() + res.data.data.expires_in * 1000)
    }).catch(err => {
      console.log(err)
    })
  })
}

export default async function request (options) {
  let token = ''
  if (checkPath(options.url)) {
    token = await getToken()
  }
  
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.baseUrl+options.url,
      header: {'Authorization': 'Bearer ' + token},
      method: options.method || 'GET',
      data: options.data || {},
      success: res => {
        if (res.statusCode == 200) {
          if (res.data.code === 0) {
            resolve(res.data)
          } else {
            msg.alert(res.data.msg)
            reject(res.data.msg)
          }
        } else if (res.statusCode == 401) {
          console.log(401)
          // wx.getUserProfile({
          //   desc: '用于完善会员资料',
          //   success: res => {
          //     // 这里也可以选择性返回需要的字段
          //     resolve(res)
          //   }
          // })
        } else {
          console.log(res)
          msg.alert(res.statusCode + ', ' + res.errMsg)
          reject(res.statusCode + ', ' + res.errMsg)
        }
      },
      fail: err => {
        console.log(2222)
        msg.alert(err.errMsg)
        reject(err.errMsg)
      }
    })
  })
}