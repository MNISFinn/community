// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startX: 0, //开始坐标
    startY: 0,
    goodsList:[
      {
        goods_name: '',
        goods_quantity:'',
        goods_detail: ''
      }
    ]
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
  
  /**
   * 填写商品名称
   * @param {*} e 
   */
  setGoodsName: function (e) {
    let index = parseInt(e.currentTarget.id.replace("goods_name-", ""));
    let goods_name = e.detail.value;
    let goods_list = this.data.goodsList;
    goods_list[index].goods_name = goods_name;
    this.setData({
      goodsList: goods_list
    });
  },

  /**
   * 填写商品数量
   * @param {*} e 
   */
  setGoodsQuantity: function (e) {
      let index = parseInt(e.currentTarget.id.replace("goods_quantity-", ""));
      let goods_quantity = e.detail.value;
      let goods_list = this.data.goodsList;
      goods_list[index].goods_quantity = goods_quantity;
      this.setData({
        goodsList: goods_list
      });
    },

  /**
   * 填写商品描述
   * @param {*} e 
   */
  setGoodsDetail: function (e) {
    let index = parseInt(e.currentTarget.id.replace("goods_detail-", ""));
    let goods_detail = e.detail.value;
    let goods_list = this.data.goodsList;
    goods_list[index].goods_detail = goods_detail;
    this.setData({
      goodsList: goods_list
    });
  },

  touchE: function (e) {
    let that = this
    if (e.changedTouches.length == 1) {
      //手指移动结束后触摸点位置的X坐标
      let endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      let disX = that.data.startX - endX;
      let delBtnWidth = that.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      let txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "rpx" : "left:0rpx";
      //获取手指触摸的是哪一项
      let index = e.currentTarget.dataset.index;
      let goods_list = that.data.goodsList;
      goods_list[index].txtStyle = txtStyle;
      //更新列表的状态
      that.setData({
        goodsList: goods_list
      });
    }
  },

  /**
   * 手指触摸动作开始 记录起点X坐标
   * @param {*} e 
   */
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.goodsList.forEach(function (v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      goodsList: this.data.goodsList
    })
  },

  /**
   * 滑动事件处理
   * @param {*} e 
   */
  touchmove: function (e) {
    let that = this,
        index = e.currentTarget.dataset.index, //当前索引
        startX = that.data.startX, //开始X坐标
        startY = that.data.startY, //开始Y坐标
        touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
        touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
    //获取滑动角度
    angle = that.angle({
        X: startX,
        Y: startY
      }, 
      {
        X: touchMoveX,
        Y: touchMoveY
    });
    that.data.goodsList.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
        if (i == index) {
          if (touchMoveX > startX) //右滑
            v.isTouchMove = false
          else //左滑
            v.isTouchMove = true
        }
    })
    //更新数据
    that.setData({
      goodsList: that.data.goodsList
    })
  },

  /**
  * 计算滑动角度
  * @param {Object} start 起点坐标
  * @param {Object} end 终点坐标
  */
  angle: function (start, end) {
    let _X = end.X - start.X,
        _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },

  /**
   * 增加商品
   */
  addItem:function() {
    let item = {
      goods_name: '',
      goods_quantity: '',
      goods_detail: ''
    }
    let goods_list = this.data.goodsList
    goods_list.push(item)
    this.setData({
      goodsList: goods_list
    })
  },
    /**
   * 删除商品
   */
  removeItem: function(e) {
    let index = e.currentTarget.dataset.index
    this.data.goodsList.splice(index, 1)
    this.setData({
      goodsList: this.data.goodsList
    });
  },
})