// pages/photographers/photographers.js
const server = require('../../utils/util.js').server
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all:null,
    empty:true,
    can:false
  },
  reserve:function(){
    var that = this
    if(that.data.can==false){
      wx.showModal({
        title: '提示',
        content: '请先注册！',
      })
      return
    }
    wx.navigateTo({
      url: 'reserve/reserve',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.getStorage({
      key: 'allInfo',
      success: function(res) {
        that.data.can=true
        that.setData({
          can:true
        })
      },
    })
    wx.request({
      url: server + '/ReservePhoto/ReservePhoto/allCameramen',
      success: function (res) {
        console.log('摄影师数据', res.data)
        if (!res.data.isempty) {
          that.data.all = res.data
          that.data.empty = false
          that.setData({
            all: res.data.data,
            empty:false
          })
        }
      }
    })
  },

  detail:function(e){
    console.log('点击事件',e)
    var id=e.currentTarget.id
    wx.navigateTo({
      url: '../photographer_detail/detail?id='+id,
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