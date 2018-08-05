// pages/photographers/reserve/reserve.js
const app = getApp()
const server = require('../../../utils/util.js').server

Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemRange:['毕业留念','写真','航拍','旅拍','医美拍摄','视频','最美证件照'],
  },
  bindItemChange:function(e){
    console.log(e)
    this.data.itemVal = e.detail.value
    this.setData({
      itemVal: e.detail.value
    })
  },
  bindDateChange:function(e){
    this.setData({
      dateVal: e.detail.value
    })
  },
  bindTime1Change:function(e){
    this.setData({
      time1Val:e.detail.value
    })
  },
  bindTime2Change: function (e) {
    this.setData({
      time2Val: e.detail.value
    })
  },
  reserve:function(e){
    console.log('收到的信息：',e.detail.value)
    if (e.detail.value.item==null){
      wx.showToast({
        title: '请填写项目！',
        icon:'none'
      })
      return
    }
    if (e.detail.value.date == null) {
      wx.showToast({
        title: '请填写日期！',
        icon: 'none'
      })
      return
    }
    if (e.detail.value.time1 == null || e.detail.value.time2 == null) {
      wx.showToast({
        title: '请填写时间！',
        icon: 'none'
      })
      return
    }
    if ((Number)(e.detail.value.time1.slice(0, 2)) >= (Number)(e.detail.value.time2.slice(0, 2))) {
      wx.showToast({
        title: '时间小于1h！',
        icon: 'none'
      })
      return
    }
    if (e.detail.value.place == '') {
      wx.showToast({
        title: '请填写地点！',
        icon: 'none'
      })
      return
    }
    if (e.detail.value.number == '') {
      wx.showToast({
        title: '请填写人数！',
        icon: 'none'
      })
      return
    }
    if (!/^[1][0-9]{10}$/.test(e.detail.value.phone) && e.detail.value.phone != '') {
      wx.showToast({
        title: '请输入正确手机号！',
        icon: 'none',
      })
      return
    }
    var info = e.detail.value
    info.userId = app.globalData.userInfo.id
    info.name = app.globalData.userInfo.trueName
    info.item = this.data.itemRange[info.item]
    info.time = info.time1 + '-' + info.time2
    delete info.time1
    delete info.time2
    console.log('要提交的信息',info)
    wx.request({
      url: server + '/ReservePhoto/ReservePhoto/reserve',
      method: 'POST',
      data: info,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log(res.data)
        if(!isNaN(res.data)){
          wx.showModal({
            title: '预约成功！',
            content: '工作人员会再24小时内与您联系，请保持手机畅通',
            showCancel: false,
            success: function (re) {
              if (re.confirm) {
                wx.navigateBack()
              }
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var now = new Date
    var tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    var year = tomorrow.getFullYear()
    var month = tomorrow.getMonth() + 1
    var day = tomorrow.getDate()
    var start = year+'-'+month+'-'+day

    var endday = new Date(tomorrow)
    endday.setDate(tomorrow.getDate() + 30)
    year = endday.getFullYear()
    month = endday.getMonth() + 1
    day = endday.getDate()
    var end = year + '-' + month + '-' + day
    this.setData({
      dateStart: start,
      dateEnd: end
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