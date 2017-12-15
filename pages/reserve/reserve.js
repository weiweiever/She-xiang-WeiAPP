// pages/reserve/reserve.js
const app = getApp()

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
    var util = require('../../utils/util.js')
    var now = new Date
      var year = now.getFullYear()
      var month = now.getMonth()+1
      var day = now.getDate()
    var tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
      var year1 = tomorrow.getFullYear()
      var month1 = tomorrow.getMonth() + 1
      var day1 = tomorrow.getDate()
    var afterTomorrow = new Date(now)
    afterTomorrow.setDate(afterTomorrow.getDate() + 2)
      var year2 = afterTomorrow.getFullYear()
      var month2 = afterTomorrow.getMonth() + 1
      var day2 = afterTomorrow.getDate()
    var after3 = new Date(now)
    after3.setDate(after3.getDate() + 3)
      var year3 = after3.getFullYear()
      var month3 = after3.getMonth() + 1
      var day3 = after3.getDate()

      var date= year + '年' + month + '月' + day + '日'
      var date1= year1 + '年' + month1 + '月' + day1 + '日'
      var date2= year2 + '年' + month2 + '月' + day2 + '日'
      var date3= year3 + '年' + month3 + '月' + day3 + '日'
      var time1= '9:00-12:30'
      var time2= '12:30-16:00'
      var time3= '16:00-18:30'
      var time4= '18:30-21:00'
      var work1= '摄影师'
      var work2= '化妆师'
      var work3= '修图师'
      var work4= '导演'
    app.globalData.time = now
    this.setData({
      date,
      dateRange:[date1, date2, date3],
      timeRange:[time1, time2, time3,time4],
      workRange:[work1,work2,work3,work4]
    })
  },
  bindDateChange: function (e) {
    this.setData({
      dateValue: e.detail.value
    })
  },
  bindTimeChange: function (e){
    this.setData({
      timeValue:e.detail.value
    })
  },
  bindWorkChange: function (e) {
    this.setData({
      workValue: e.detail.value
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