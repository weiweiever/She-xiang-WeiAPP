//app.js
App({
  globalData: {
    userInfo: null,
    hasUserInfo: false,
    openId: null,
    sessionKey: null,
    time: null,
    dateRange: null,
    isMember:false,
    device:null,
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

  }
  
})