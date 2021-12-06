// components/communitySelector/communitySelector.js
import request from '../../utils/network'

const app = getApp()
let qqmap_sdk = require('../../utils/qqmap/qqmap-wx-jssdk')
let qqmap = ''

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showModalStatus: {
      type: Boolean,
      value: false
    }
  },

  behaviors: ['wx://component-export'],
  export() {
    return { myField: 'myValue' }
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
      qqmap = new qqmap_sdk({
        key: 'USMBZ-3FMRV-LSEPR-UMKA2-KUOW5-CXFH4'
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
    selectCommunity: function(event) {
      console.log('aaaa')
      var myEventDetail = {
        'community_info': this.data.community_info
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('show', myEventDetail, myEventOption)

      this.setData({
        showModalStatus: false
      })
    }
  }
})
