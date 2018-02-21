// pages/my/jobrecord/jobrecord.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    record:null
  },
  cancel:function(){
    wx.navigateTo({
      url: 'cancel/cancel',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://zhangzhiyu.xin/weiphp/index.php/PartJob/PartJob/getrecords',
      method:'GET',
      data:{
        id:app.globalData.userInfo.id
      },
      success:function(res){
        if(res.data.empty==true){
          console.log('无兼职记录')
          wx.showModal({
            title: '提示',
            content: '暂无兼职记录！',
            showCancel:false,
            success:function(res){
              if(res.confirm){
                wx.navigateTo({
                  url: '../my',
                })
              }
            }
          })
        }
        else{
          console.log('兼职记录', res.data)
          that.data.record = res.data
          that.setData({
            record: res.data
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