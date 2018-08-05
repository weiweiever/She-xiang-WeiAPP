// pages/reserve/reserve.js
const app = getApp()
const server = require('../../utils/util.js').server
Page({
  /**
   * 页面的初始数据
   */
  data: {
    jobs:new Array(),
    times:new Array(),
    date:null,
    submitdate:null
  },
  submit:function(e){
    var that = this
    if(e.detail.value.date==null){
      wx.showToast({
        title: '请选择日期！',
        icon: 'none'
      })
      return
    }
    if (e.detail.value.time == null) {
      wx.showToast({
        title: '请选择时段！',
        icon: 'none'
      })
      return
    }
    if (e.detail.value.job == null) {
      wx.showToast({
        title: '请选择工作！',
        icon: 'none'
      })
      return
    }
    var info={
      date: that.data.submitdate[e.detail.value.date],
      time: that.data.times[e.detail.value.time],
      job: that.data.jobs[e.detail.value.job],
      workerId: app.globalData.userInfo.id,
      name: app.globalData.userInfo.trueName
    }
    console.log('提交的信息：',info)
    wx.request({
      url: server + '/PartJob/PartJob/ask',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: info,
      success:function(res){
        console.log('兼职申请返回',res.data)
        if (!isNaN(res.data) && res.data > 0){
          wx.showModal({
            title: '提交成功！',
            content: '请在‘我的’界面留意审核结果',
            showCancel:false
          })
        } else if(res.data==0){
          wx.showModal({
            title: '失败！',
            content: '申请名额已满！请换一个时间再试',
            showCancel:false
          })
        } else if (res.data == -1) {
          wx.showModal({
            title: '失败！',
            content: '不能在重复时段预约！',
            showCancel: false
          })
        } else if(res.data == -2){
          wx.showModal({
            title: '失败！',
            content: '您暂无申请此工作的权限！请培训且审核通过后进行申请',
            showCancel:false
          })
        }
      }
    })
  },
  //签到
  sign:function(){
    wx.showLoading({
      title: '获取位置信息',
    })
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        wx.hideLoading();
        var info ={
         latitude: res.latitude,
         longitude: res.longitude,
         accuracy: res.accuracy,
         id:app.globalData.userInfo.id,
         name: app.globalData.userInfo.trueName
        }
        console.log("位置信息：",info)
        wx.request({
          url: server + '/PartJob/PartJob/sign',
          method:'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data:info,
          success:function(res){
            console.log('位置-接收数据',res.data)
            if(!isNaN(res.data) && res.data>0){
              var lastTime = wx.getStorageSync('signTime')
              var timeStamp = new Date().getTime()
              console.log('lastTime',lastTime)
              console.log('now',timeStamp)
              if(!lastTime || timeStamp-lastTime>1000){
                wx.showToast({
                  title: '签到成功'
                })
                wx.setStorage({
                  key: 'signTime',
                  data: timeStamp,
                })
                wx.navigateTo({
                  url: '../index/index'
                })
              }else{
                wx.showToast({
                  title: '请勿重复签到',
                })
              }
            }
            else{
              wx.showModal({
                title: '签到失败',
                content: '请确认您今天是否有预约！',
              })
            }
          }
        })
      },
      fail:function(){
        console.log('位置接口调用失败')
        wx.hideLoading()
        wx.showToast({
          title: '获取位置失败',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
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

      var date1= year1 + '年' + month1 + '月' + day1 + '日'
      var date2= year2 + '年' + month2 + '月' + day2 + '日'
      var date3= year3 + '年' + month3 + '月' + day3 + '日'

      var date10 = year1 + '-' + month1 + '-' + day1
      var date20 = year2 + '-' + month2 + '-' + day2
      var date30 = year3 + '-' + month3 + '-' + day3
      this.data.submitdate = [date10,date20,date30]
    wx.request({
      url: server + '/PartJob/PartJob/getjobinfo',
      success:function(res){
        var jobs_ = res.data.jobs
        var times_ = res.data.times
        for(var i in jobs_){
          that.data.jobs[i]=jobs_[i].work
        }
        for (var i in times_) {
          that.data.times[i] = times_[i].time
        }
        that.setData({
          timeRange: that.data.times,
          workRange: that.data.jobs
        })
      }
    })
    app.globalData.time = now
    that.data.date = [date1, date2, date3]
    this.setData({
      dateRange:[date1, date2, date3]
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