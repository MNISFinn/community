// components/searchBar/index.js
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
   
  },

  /**
   * 组件的方法列表
   */
  methods: {
    editName(e) {
      let that = this;
      let name = e.detail.value;
      if (name.length > 0) {
        let list = that.data.list;
        list.forEach(s => {
          if (s.title.indexOf(name) > -1) {
            s.show = true;
          }
          else {
            s.show = false;
          }
        })
        that.setData({
          list: list
        })
      }
    }
  }
})
