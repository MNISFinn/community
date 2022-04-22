// pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store_goods_list: [],
    self_goods_list: [],
    expect_arrive_time: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let store_goods = JSON.parse(decodeURIComponent(options.store_goods)) 
    let self_goods = JSON.parse(decodeURIComponent(options.self_goods)) 
    // console.log(store_goods['goods'])
    // console.log(self_goods['goods'])
    let store_goods_list = []
    let self_goods_list = []
    store_goods_list.push({
      store_id: 1,
      store_name: '沃尔玛',
      goods_list:[{
          goods_name: 'store_goods',
          goods_quantity: 1,
          goods_price: 29.9,
          goods_detail: 'demo',
          goods_image: ['https://order-goods-1306524285.cos.ap-shanghai.myqcloud.com/20211115215704-619267305e50f.jpeg']
        },{
          goods_name: 'store_goods2',
          goods_quantity: 2,
          goods_price: 30,
          goods_detail: 'demo',
          goods_image: ['https://order-goods-1306524285.cos.ap-shanghai.myqcloud.com/20211115215704-619267305e50f.jpeg']
        }
      ] 
    })
    // 商家商品
    /*if (store_goods['goods'].length > 0) {
      Object.keys(store_goods['goods']).forEach(function(key) {
        let goods_list = []
        Object.keys(store_goods['goods'][key]).forEach(function(item_key) {
          goods_list.push({
            goods_name: store_goods['goods'][key][item_key]['goods_name'],
            goods_quantity: store_goods['goods'][key][item_key]['goods_quantity'],
            goods_price: 0.00,
            goods_detail: store_goods['goods'][key][item_key]['goods_detail'],
            goods_image: store_goods['goods'][key][item_key]['goods_imgs'],
          })
        })
        store_goods_list.push({
          store_id: store_goods[key]['store_id'],
          store_name: store_goods[key]['store_name'],
          goods_list
        })
      })
    }*/
    // 自选商品
    if (self_goods['goods'].length > 0) {
      Object.keys(self_goods['goods']).forEach(function(key) {
        console.log(key)
        self_goods_list.push({
        store_id: '',
        store_name: '',
        goods_list: [{
          goods_name: self_goods['goods'][key]['goods_name'],
          goods_quantity: self_goods['goods'][key]['goods_quantity'],
          goods_price: 0.00,
          goods_detail: self_goods['goods'][key]['goods_detail'],
          goods_image: self_goods['goods'][key]['goods_imgs'],
        }]
      })
      })
    }

    // 预计送达时间 15分钟
    let expect_timestamp = Date.parse(new Date()) + 60 * 15 * 1000
    let expect_arrive_time = new Date(expect_timestamp).getHours() + ':' + new Date(expect_timestamp).getMinutes()

    this.setData({
      store_goods_list,
      self_goods_list,
      expect_arrive_time
    })
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
   * 派单
   */
  placeOrder: function() {
    
  }
})