// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    goodsList: [
      {
        goods_id: 10001,
        goods_name: "goodsName1",
        goods_image: "https://id-card-1306524285.cos.ap-shanghai.myqcloud.com/20211207211113-61af5d71bf108.jpeg",
        goods_price: 22.22,
        store_id: 1,
        store_name: "THE STORE"
      },
      {
        goods_id: 10002,
        goods_name: "goodsName2",
        goods_image: "https://id-card-1306524285.cos.ap-shanghai.myqcloud.com/20211207211113-61af5d71bf108.jpeg",
        goods_price: 33.22,
        store_id: 2,
        store_name: "THE STORE12"
      },
      {
        goods_id: 10003,
        goods_name: "goodsName3",
        goods_image: "https://id-card-1306524285.cos.ap-shanghai.myqcloud.com/20211207211113-61af5d71bf108.jpeg",
        goods_price: 44.22,
        store_id: 3,
        store_name: "THE STORE_34"
      }
    ]
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  }
})
