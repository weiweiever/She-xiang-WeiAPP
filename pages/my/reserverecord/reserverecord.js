// pages/my/reserverecord/reserverecord.js
const app = getApp()
const server = require('../../../utils/util.js').server
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record:null
  },
  cancel:function(){
    wx.showToast({
      title: '暂未开放！',
      icon:'none'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: server + '/ReservePhoto/ReservePhoto/getrecords',
      data:{
        reserveid:app.globalData.userInfo.id
      },
      success:function(res){
        console.log(res.data)
        that.data.record=res.data.data
        that.setData({
          record:res.data.data
        })
        if(res.data.empty==true){
          wx.showToast({
            title: '暂无记录！',
            icon:'none',
            duration:2500
          })
        }
      }
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