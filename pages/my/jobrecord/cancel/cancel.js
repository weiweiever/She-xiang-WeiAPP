// pages/my/jobrecord/cancel/cancel.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    records:null
  },
  cancel:function(e){
    console.log(e.target.dataset)
    var id = e.target.dataset.idx
    wx.request({
      url: 'https://zhangzhiyu.xin/weiphp/index.php/PartJob/PartJob/delete',
      method: 'GET',
      data:{id: id},
      success:function(res){
        console.log('取消返回数据',res.data)
        wx.showToast({
          title: '取消成功！',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://zhangzhiyu.xin/weiphp/index.php/PartJob/PartJob/cancellable',
      method: 'GET',
      data:{id:app.globalData.userInfo.id},
      success:function(res){
        console.log('可取消的兼职',res.data)
        if(res.data.empty==false){
          that.data.records = res.data.data
          that.setData({
            records:res.data.data
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