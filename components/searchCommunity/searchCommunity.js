// components/searchCommunity/searchCommunity.js
import request from '../../utils/network'

const app = getApp()
let qqmap_sdk = require('../../utils/qqmap/qqmap-wx-jssdk')
let qqmap = ''

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '标题'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 弹窗显示控制
    showModalStatus: false,
    selectorVisible: false,
    city: '',
    address: '',
    showSuggestion: false,
    suggestion: [],
    index: 0,
    community_info: {}
  },

  lifetimes: {
    attached: function() {
      // let user_id = app.globalData.userInfo['user_id']
      qqmap = new qqmap_sdk({
        key: 'USMBZ-3FMRV-LSEPR-UMKA2-KUOW5-CXFH4'
      })
      // console.log(app.globalData.userInfo)
      // request({
      //   url: 'get_addresses',
      //   method: 'POST',
      //   data: {
      //     user_id: user_id
      //   }
      // }).then(res => {
      //   console.log(res)
      //   this.hideModal()
      // }).catch(err => {

      // })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 点击显示底部弹出
     */
    changeRange: function() {
      this.showModal()
    },

    /**
     * 底部弹出框
     */
    showModal: function() {
      // 背景遮罩层
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      })
      //this.animation = animation
      animation.translateY(300).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: true
      })
      setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
        })
      }.bind(this), 200)
    },

    /**
     * 点击背景面任意一处时，弹出框隐藏
     */
    hideModal:function() {
      //弹出框消失动画
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      })
      //this.animation = animation
      animation.translateY(300).step()
      this.setData({
        animationData: animation.export(),
      })
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export(),
          showModalStatus: false
        })
      }.bind(this), 200)
    },
    handleFoucus: function() {
      this.setData({
        selectorVisible: true
      })
    },
    onSelectCity:function(event) {
      this.setData({
        city: event.detail.city.name
      })
    },
    //数据回填方法
    backfill: function (e) {
      var id = e.currentTarget.id;
      for (var i = 0; i < this.data.suggestion.length;i++){
        if(i == id){
          let chosen_community = this.data.suggestion[i]
          this.setData({
            backfill: chosen_community.title,
            community_info: chosen_community,
            showSuggestion: false
          });
        }  
      }
    },
    //触发关键词输入提示事件
    getsuggest: function(e) {
      var _that = this;
      //调用关键词提示接口
      qqmap.getSuggestion({
        //获取输入框值并设置keyword参数
        keyword: e.detail.value, //用户输入的关键词，可设置固定值,如keyword:'KFC'
        region: _that.data.city,
        region_fix: 1,
        policy: 1,
        filter: encodeURI('category=室内及附属设施,房产小区'),
        page_size: 20,
        page_index: 1,
        success: function(res) { //搜索成功后的回调
          console.log(res);
          var sug = [];
          for (var i = 0; i < res.data.length; i++) {
            sug.push({ // 获取返回结果，放到sug数组中
              title: res.data[i].title,
              id: res.data[i].id,
              addr: res.data[i].address,
              province: res.data[i].province,
              city: res.data[i].city,
              district: res.data[i].district,
              latitude: res.data[i].location.lat,
              longitude: res.data[i].location.lng
            });
          }
          _that.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
            showSuggestion: true,
            suggestion: sug
          });
        },
        fail: function(error) {
          console.error(error);
        },
        complete: function(res) {
          console.log(res);
        }
      });
    },

    /**
     * 添加小区
     * @param {*} event 
     */
    submitAddress: function(event) {
      let user_id = app.globalData.userInfo['user_id']
      let address = event.detail.value.address
      let community = this.data.community_info
      console.log(address, community)
      request({
        url: 'address/add',
        method: 'POST',
        data: {
          address,
          community,
          user_id
        }
      }).then(res => {
        console.log(res)
        wx.redirectTo({
          url: '../../pages/communityList/communityList',
        })
        this.hideModal()
      }).catch(err => {
        console.log(err)
      })
      
    }
  }
})
