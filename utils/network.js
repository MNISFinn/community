import config from './config'
import msg from './message'
import util from './util'

/**
 * 验证是否需要token
 * @param {*} path 
 */
function checkPath(path) {
  const index = config.requestExclude.indexOf(path)
  return index < 0
}

async function getToken() {
  const currentTime = new Date().getTime()
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
  util.queryLogin()
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
          if (res.data.code === 200) {
            resolve(res.data)
          } else {
            msg.alert(res.data.msg)
            reject(res.data.msg)
          }
        } else if (res.statusCode == 401) {
          // console.log(res)
          msg.toast('请重新登录', 'error')
          reject(res.statusCode + ', ' + res.errMsg)
        } else {
          msg.toast('登录失败', 'error')
          reject(res.statusCode + ', ' + res.errMsg)
        }
      },
      fail: err => {
        msg.toast(err.errMsg, 'error')
        reject(err.errMsg)
      }
    })
  })
}