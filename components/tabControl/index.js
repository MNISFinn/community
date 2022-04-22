// Components/tabContorl/tabControl.js
Component({
  properties: {
      titles: {
          type: Array
      }
  },
  data: {
      currentIndex: 0
  },
  methods: {
      handleClickTab(e) {
          //拿到点击的index
          const index = e.currentTarget.dataset.index
          this.setData({
              currentIndex: index
          })
          //给页面传递目前点击的tab
          this.triggerEvent('sendIndex', { TabcurrentIndex: index })
      }
  }
})
