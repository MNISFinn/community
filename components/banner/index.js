// components/banner/index.js
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
    carouselList:[
      {
        "id": "101",
        "img": "https://id-card-1306524285.cos.ap-shanghai.myqcloud.com/20211207211113-61af5d71bf108.jpeg",
        "title": "",
        "url": "https://www.baidu.com/"
    },
    {
        "id": "102",
        "img": "https://id-card-1306524285.cos.ap-shanghai.myqcloud.com/20211207212014-61af5f8ee62ba.jpg",
        "title": "百度翻译",
        "url": "https://fanyi.baidu.com/"
    }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击了轮播图
    chomeCarouselClick: function (event) {
      var urlStr = event.currentTarget.dataset.url;
      console.log("点击了轮播图：" + urlStr);
      // wx.navigateTo({
      //   url: 'test?id=1'
      // })
    }
  }
})
