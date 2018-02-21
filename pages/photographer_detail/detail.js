// pages/photographer_detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    press:false
  },
  reserve:function(e){
    console.log('填写的信息',e.detail.value)
    if(e.detail.value.item==null){
      wx.showToast({
        title: '请填写预约项目',
        icon:'none'
      })
      return
    }
    if (e.detail.value.place == "") {
      wx.showToast({
        title: '请填写预约地点',
        icon: 'none'
      })
      return
    }
    if (e.detail.value.date == null) {
      wx.showToast({
        title: '请填写预约日期',
        icon: 'none'
      })
      return
    }
    if (e.detail.value.timeStart == null) {
      wx.showToast({
        title: '请填写开始时间',
        icon: 'none'
      })
      return
    }
    if (e.detail.value.timeEnd == null) {
      wx.showToast({
        title: '请填写预约项目',
        icon: 'none'
      })
      return
    }
    wx.showToast({
      title: '暂未开放！',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var now = new Date
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

    var date1 = year1 + '年' + month1 + '月' + day1 + '日'
    var date2 = year2 + '年' + month2 + '月' + day2 + '日'
    var date3 = year3 + '年' + month3 + '月' + day3 + '日'
    var time1 = '9:00'
    var time2 = '10:00'
    var time3 = '11:00'
    var time4 = '12:00'
    var time5 = '13:00'
    var time6 = '14:00'
    var time7 = '15:00'
    var time8 = '16:00'
    var time9 = '17:00'
    var time10= '18:00'
    var time11= '19:00'
    var time12= '20:00'

    var item1 = '集体照'
    var item2 = '约拍'
    var item3 = '证件照'
    var item4 = '短视频'
    this.setData({
      dateRange: [date1, date2, date3],
      timeRange: [time1, time2, time3, time4, time5, time6, time7, time8, time9, time10, time11, time12],
      itemRange: [item1, item2, item3, item4]
    })
  },
  press: function(){
    this.setData({
      press:true
    })
  },
  bindDateChange: function (e) {
    this.setData({
      dateValue: e.detail.value
    })
  },
  bindItemChange: function (e) {
    this.setData({
      itemValue: e.detail.value
    })
  },
  bindTime1Change: function (e) {
    this.setData({
      time1Value: e.detail.value
    })
  },
  bindTime2Change: function (e) {
    this.setData({
      time2Value: e.detail.value
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