// pages/photographer_detail/detail.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    press:false,
    info:null,
    id:null,
    itemRange: null,
    dateRange:'',
    timeRange:''
  },
  reserve:function(e){
    var that = this
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
    if (e.detail.value.time == null) {
      wx.showToast({
        title: '请选择预约时段',
        icon: 'none'
      })
      return
    }
    var req={
      date:that.data.dateRange[e.detail.value.date],
      time: that.data.timeRange[e.detail.value.time],
      place:e.detail.value.place,
      item:that.data.itemRange[e.detail.value.item],
      reserveId:app.globalData.userInfo.id,
      reserveName: app.globalData.userInfo.trueName,
      serverId:that.data.id,
      serverName:that.data.info.trueName
    }
    console.log('填写的信息',req)
    wx.request({
      url: 'https://zhangzhiyu.xin/weiphp/index.php/ReservePhoto/ReservePhoto/reserve',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data:req,
      success:function(res){
        console.log(res.data)
        if(res.data!='error'){
          wx.showModal({
            title: '提示',
            content: '预约成功！请在‘我的’界面留意预约信息',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.navigateTo({
                  url: '../photographers/photographers',
                })
              }
            }
          })
         
        }else{
          wx.showModal({
            title: '提示',
            content: '预约失败！此时段已被预约，请选择其他时段',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this

    var id=options.id
    this.data.id=id
    wx.request({
      url: 'https://zhangzhiyu.xin/weiphp/index.php/ReservePhoto/ReservePhoto/getInfoById',
      data:{
        id:id
      },
      success:function(res){
        console.log('接收到的摄影师信息',res.data)
        if(res.data.empty==false){
          that.data.info=res.data.data
          that.data.itemRange = that.data.info.type.split(",")
          that.setData({
            info:res.data.data,
            itemRange: that.data.info.type.split(",")
          })
        }
      }
    })

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

    var date1 = year1 + '-' + month1 + '-' + day1
    var date2 = year2 + '-' + month2 + '-' + day2
    var date3 = year3 + '-' + month3 + '-' + day3

    var time0 = '8:00-9:00'
    var time1 = '9:00-10:00'
    var time2 = '10:00-11:00'
    var time3 = '11:00-12:00'
    var time4 = '12:00-13:00'
    var time5 = '13:00-14:00'
    var time6 = '14:00-15:00'
    var time7 = '15:00-16:00'
    var time8 = '16:00-17:00'
    var time9 = '17:00-18:00'
    var time10= '18:00-19:00'
    var time11= '19:00-20:00'
    var time12= '20:00-21:00'

    var item1 = '室内写真'
    var item2 = '室外写真'
    var item3 = '毕业相册'
    var item4 = '短视频'
    
    this.data.timeRange = [time1, time2, time3, time4, time5, time6, time7, time8, time9, time10, time11, time12]
    this.data.dateRange = [date1, date2, date3]
    this.setData({
      dateRange: [date1, date2, date3],
      timeRange: [time1, time2, time3, time4, time5, time6, time7, time8, time9, time10, time11, time12],
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