// pages/communityList/communityList.js
Page({
  data: {
    selectorVisible: false,
    list: []
  },
  onReady: function() {
    this.search = this.selectComponent("#search-community")
  },
  showSelector: function() {
    this.setData({
      selectorVisible: true
    })
    this.search.changeRange()
  }
})
