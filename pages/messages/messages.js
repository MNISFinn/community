// pages/messages/messages.js
const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;
var uid, toUid // 发送者，接收者

/**
 * 初始化数据
 */
function initData(that) {
  //输入框的内容
  inputVal = '';
  //消息列表，包含客服和用户的聊天内容
  msgList = []
  that.setData({
    msgList,
    inputVal
  })
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: '100vh',
    inputBottom: 0,
    userAvatar: '', // 发送者头像
    toUserAvatar: '' // 接收者头像
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    uid = app.globalData.userInfo.user_id
    toUid = options.user_id
    this.setData({
      userAvatar: app.globalData.userInfo.avatar
    })
    //初始化websocket连接
    this.chat(uid, toUid);
    //监听心跳的方法
    this.webSocketXin();
    //聊天方法
    initData(this);    

    //监听消息
    wx.onSocketMessage(res=>{
      let r = JSON.parse(res.data)
      r["speaker"] = "server"
      res.data = JSON.stringify(r)
         //追加到消息列表里
        msgList.push(JSON.parse(res.data))
        inputVal = '';
        this.setData({
          msgList,
          inputVal
        });
    })


  },

  //页面卸载时间
  onUnload(){
    wx.closeSocket();
  },
  /**
   * 获取聚焦
   */
  focus: function(e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function(e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })
  },

  /**
   * 发送点击监听
   */
  sendClick: function(e) {
    //客户发的信息
    let customerMsg = {
      type: 1,
      uid: uid,
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value
    };

     //关闭心跳包
     this.webSocketXin(60000, false)
    //发送给websocket
    wx.sendSocketMessage({
      // data: JSON.stringify(customerMsg),
      data: JSON.stringify({type: 1, content: e.detail.value}),
      success:res=>{
        //重启心跳包
        this.webSocketXin(40000, true)
      }  
    })

    //追加到消息列表里
    msgList.push(customerMsg)
    inputVal = '';
    this.setData({
      msgList,
      inputVal
    });
  },
  /**
   * 退回上一页
   */
  toBackClick: function() {
    wx.navigateBack({})
  },
  /**
   * websocket
   */
  chat(uid, toUid){
     //进行连接php的socket
     wx.connectSocket({
       //wss 协议相当于你要有一个ssl证书，https
       //ws  就相当于不实用证书  http
      // url: 'ws://api.fridaysoon.asia:8090/ws/chat?uid=4&toUid=1',
      url: 'ws://127.0.0.1:1016/ws/chat?uid='+uid+'&toUid='+toUid,
      success: function () {
        console.log('websocket连接成功~')
      },
      fail: function () {
        console.log('websocket连接失败~')
      }
    })
  },


  /**
   * 监听websocket心跳连接的方法
   */
  webSocketXin(time=60000,status=true){
    var timing;
    if(status == true){
      timing = setInterval(function () {
        console.log("当前心跳已重新连接");
        //循环执行代码
        // wx.sendSocketMessage({
        //   data: JSON.stringify({
        //     type: 'active'
        //   }),
        //   fail(res) {
        //     //关闭连接
        //     wx.closeSocket();
        //     //提示
        //     wx.showToast({
        //       title: '当前聊天已断开',
        //       icon:'none'
        //     })
        //     clearInterval(timing);
        //     console.log("当前心跳已关闭");
        //   }
        // });
      }, time) //循环时间，注意不要超过1分钟  
    } else {
      //关闭定时器
      clearInterval(timing);
      console.log("当前心跳已关闭");
    }
  

  }

})