// let util = require("./../../utils/util.js");
import util from './../../utils/util.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      nav:["推荐","排行榜","搜索"],
      curNum:0,
      searchstort: []  //搜索记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    console.log(app)
     var that=this;

     //获取搜索记录
     wx.getStorage({
       key: 'task',
       success: function (res) {
         //console.log(res)
         that.setData({
           searchstort: res.data
         })

       }
     })

     //推荐
     util.getIndexData(function(res){
        var data = res.data.data; //取得首页数据
        that.setData({
          indexdata:data
        })   
        // console.log(res)
     })

      //排行榜
     util.get_toplist(function(res){
       let data = res.data.topList;
       that.setData({
         topList:data
       })
      //  console.log(res)
     })
     
     //搜索
    util.get_hot_key(function(res){
       that.setData({
         searchHotKey:res
       })
    })

  },



  //导航条
tabnav:function(ev){
 let index = ev.currentTarget.dataset.navindex;
 this.setData({
   curNum:index
 })
//  console.log(index)
},
getsearchVal: function (ev) {
  this.setData({
    serchVal: ev.detail.value
  })
  // console.log(ev)
},
searchSubmit: function () { //搜索点击完成触发
  //console.log(1)
  //调用搜索接口
  var that = this;
  var value = this.data.serchVal;
  util.get_search_result(value, 1, function (res) {
    //console.log(res)
    that.setData({
      searchList: res.data.song.list  //搜索结果
    })
    // console.log(res.data.song.list)
  })
 
  
  //搜索记录
  var arr = this.data.searchstort;
  arr.push(value)
  wx.setStorage({
    key: "task",
    data: arr
  })
  // console.log(this.data.searchstort)
},
//获取焦点显示 搜索记录
getfoucus: function () {
  this.setData({
    foucus: true
  })
},

//删除搜索记录
    //1.删除  this.data.searchstort  第几个
    //2. 存到 storeage里面
    //3.更新 搜索记录
  closestorage:function(ev){
    var that = this;
    var id = ev.currentTarget.dataset.closeid;
    this.data.searchstort.splice(id,1);
    
    wx.setStorage({
      key: "task",
      data: this.data.searchstort
    })

    that.setData({
      searchstort: this.data.searchstort
    })

  },

  //播放页面
  listen: function (ev) {
    //1.获取搜索结果的id
    var id = ev.currentTarget.dataset.playid;
    //2.把当前选择的歌曲 存到app里面
    app.globalData.playlist = this.data.searchList[id];

    wx.navigateTo({
      url: '/pages/playsong/playsong'
    })
  },

  //点击历史纪录
  storeSearchreSult: function (ev) {// ---------------等待封装------
    var that = this;
    var value = ev.currentTarget.dataset.value;
    util.get_search_result(value, 1, function (res) {
      //console.log(res)
      that.setData({
        searchList: res.data.song.list  //搜索结果
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})