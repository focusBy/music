 var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app)
    
    //把app的globalData.playlist 存到data里面
    var data = app.globalData.playlist;
    this.setData({
       musiclist:data
    })
      console.log(data)
    var that =this;
    //http://ws.stream.qqmusic.qq.com/C100' + songmid + '.m4a?fromtag=38
    wx.playBackgroundAudio({
      dataUrl: 'http://ws.stream.qqmusic.qq.com/C100' + data.songmid + '.m4a?fromtag=38',
    })

    //获取音乐播放状态
    setInterval(function(){
       
       wx.getBackgroundAudioPlayerState({
         success: function(res) {
        // var status = res.status
        // var dataUrl = res.dataUrl
        // var currentPosition = res.currentPosition
        // var duration = res.duration
        // var downloadPercent = res.downloadPercent

         that.setData({
             currentPosition : res.currentPosition,//当前的时间
             duration : res.duration,
             s:res.duration%60, //秒
             m:parseInt(res.duration/60), //分
             eleWidth:res.currentPosition / res.duration *100
        })

    }
})

    },1000)
  },
    
    //进度条的拉伸
   ctrplaymusic:function(ev){
      console.log(ev);
      //移动的距离
      var eleWidth = ev.touches["0"].clientX - ev.target.offsetLeft;
       //屏幕的宽度
       var screenX = wx.getSystemInfoSync().screenWidth;

       //bar的宽度
      var barWidth = screenX - ev.target.offsetLeft*2;

      this.setData({
        eleWidth:eleWidth/barWidth*100
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