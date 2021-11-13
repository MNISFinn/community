// custom-tab-bar/index.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#e2a140",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/assets/tabbar/home.png",
      selectedIconPath: "/assets/tabbar/home_active.png",
      text: "首页"
    }, {
      pagePath: "/pages/profile/profile",
      iconPath: "/assets/tabbar/profile.png",
      selectedIconPath: "/assets/tabbar/profile_active.png",
      text: "我的"
    }]
  },
  attached() {

  },
  ready:function(){
    this.setData({
      selected: app.globalData.selectedIndex
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      app.globalData.selectedIndex = data.index;
      const url = data.path
      wx.switchTab({url})
    }
  }
})
