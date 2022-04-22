// components/goodsItem/goodsItem.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodsList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    cartList: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 减少商品数量
    decreaseQuantity: function(event) {
      let goods_id = event.currentTarget.dataset.id
      let count = event.currentTarget.dataset.count
      let cartList = this.data.cartList
      let cartItem = {}
      cartItem[goods_id] = count - 1
      if (cartItem[goods_id] < 0) {
        cartItem[goods_id] = 0
      }
      cartList = Object.assign(cartList, cartItem)
      this.setData({
        cartList
      })
    },
    // 增加商品数量
    increaseQuantity: function(event) {
      let goods_id = event.currentTarget.dataset.id
      let count = event.currentTarget.dataset.count
      let cartList = this.data.cartList
      let cartItem = {}
      cartItem[goods_id] = count + 1
      if (cartList.length == 0) {
        cartList = cartItem
      } else {
        cartList = Object.assign(cartList, cartItem)
      }
      this.setData({
        cartList
      })
    },
    // 跳转到商家店铺
    toStore: function(event) {
      let store_id = event.currentTarget.dataset.store_id
      wx.navigateTo({
        url: '../../pages/store/store?store_id='+store_id,
      })
    }
  }
})
