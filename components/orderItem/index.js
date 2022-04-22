// components/orderItem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderStatus: ""
  },

  /**
   * 组件的初始数据
   */
  data: {
    orderList: [
      {
        order_id:1001,
        order_status:1,
        order_goods: {
          "store": [
            {
              store_id: 1,
              store_name: "THE STORE",
              goods_list: [
                {
                  goods_name: "qqqq",
                  goods_quantity: 1,
                  goods_price: 22.22,
                  goods_image: "",
                }
              ]
            }
          ],
          "self": [
            {
            goods_name: "qqqq",
            goods_quantity: 1,
            goods_price: 22.22,
            goods_image: "",            
          }
          ]
        }
      },
      {
        order_id:1001,
        order_status:1,
        order_goods: {
          "store": [
            {
              store_id: 1,
              store_name: "THE STORE",
              goods_list: [
                {
                  goods_name: "qqqq",
                  goods_quantity: 1,
                  goods_price: 22.22,
                  goods_image: "",
                }
              ]
            }
          ],
          "self": [
            {
            goods_name: "qqqq",
            goods_quantity: 1,
            goods_price: 22.22,
            goods_image: "",            
          }
          ]
        }
      },
      {
        order_id:1001,
        order_status:1,
        order_goods: {
          "store": [
            {
              store_id: 1,
              store_name: "THE STORE",
              goods_list: [
                {
                  goods_name: "qqqq",
                  goods_quantity: 1,
                  goods_price: 22.22,
                  goods_image: "",
                }
              ]
            }
          ],
          "self": [
            {
            goods_name: "qqqq",
            goods_quantity: 1,
            goods_price: 22.22,
            goods_image: "",            
          }
          ]
        }
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail: function(event) {
      let order_id = event.currentTarget.dataset.order_id
      wx.navigateTo({
        url: '../../pages/orderDetail/orderDetail?order_id='+order_id,
      })
    },
    toStore: function(event) {
      let store_id = event.currentTarget.dataset.store_id
      wx.navigateTo({
        url: '../../pages/store/store?store_id='+store_id,
      })
    }
  }
})
