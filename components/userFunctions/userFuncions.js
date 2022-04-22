// components/userFuncions.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    theme: {
      type: String,
      value: ''
    },
    title: {
      type: Array,
      value: []
    },
    btn_words: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function(){
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('sendOrder', myEventDetail, myEventOption)
      this.triggerEvent('search', myEventDetail, myEventOption)
      this.triggerEvent('orderList', myEventDetail, myEventOption)
      this.triggerEvent('register', myEventDetail, myEventOption)
    },
  },
})
