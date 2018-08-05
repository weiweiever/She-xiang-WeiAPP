//index.js
//获取应用实例
const app = getApp()
const server=require('../../utils/util.js').server
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showPop: true,
    animation: null
  },
  
  //事件处理函数
  bindViewTap: function() {
   if(app.globalData.isMember){
     wx.navigateTo({
       url: '../my/my'
     })
   }
   else{
     wx.showModal({
       title: '提示',
       content: '请先注册为会员！',
     })
   }
  },
  bindPopImg:function(){
    this.setData({
      showPop: false
    })   
  },
  onLoad: function () {
    var that = this
    wx.clearStorageSync()
    // 登录
    wx.onNetworkStatusChange(function(res){
      if(!res.isConnected){
        wx.showLoading({
          title: '等待网络连接',
          mask:true
        })
      }
      else{
        wx.hideLoading()
      }
    })
    wx.getStorage({
      key: 'allInfo',
      success: function(res) {
        console.log('allInfo读取成功',res.data)
        app.globalData.userInfo=res.data
        app.globalData.openId=res.data.openId
        app.globalData.hasUserInfo=true
        app.globalData.isMember=true
        that.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo:true,
          isMember:true
        })
      },
      fail:function(){
        console.log('allInfo读取失败')
        wx.showLoading({
          title: '接收服务器数据',
          mask: true
        })
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            wx.request({
              url: server+'/Login/Login/getOpenId',
              data: {
                code: res.code
              },
              method: 'POST',
              header: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                console.log('获取openId',res.data)   //得到openId
                app.globalData.openId = res.data.openid
                // 获取用户信息
                wx.getSetting({
                  success: res => {
                    if (res.authSetting['scope.userInfo']) {
                      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                      wx.getUserInfo({
                        success: res => {
                          // 可以将 res 发送给后台解码出 unionId
                          app.globalData.userInfo = res.userInfo
                          if(res.userInfo.gender==1){
                            app.globalData.userInfo.gender='男'
                          }
                          else{
                            app.globalData.userInfo.gender='女'
                          }
                          app.globalData.hasUserInfo=true
                          that.setData({
                            hasUserInfo:true,
                            userInfo:res.userInfo
                          })
                          wx.request({
                            url: server +'/Login/Login/isMember',
                            data: {
                              openId: app.globalData.openId,
                            },
                            method: 'POST',
                            header:{
                              'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            success: function (res) {
                              console.log('确认会员返回',res.data)
                              if (res.data.isMember) {
                                app.globalData.isMember = true
                                wx.request({
                                  url: server +'/Login/Login/getUserInfo',
                                  method: 'POST',
                                  header: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                  },
                                  data:{
                                    openId: app.globalData.openId
                                  },
                                  success:function(res){
                                    wx.hideLoading()
                                    console.log('服务器获取userinfo',res.data)
                                    app.globalData.userInfo = res.data
                                    that.setData({
                                      isMember: true,
                                      hasUserInfo: true,
                                      userInfo: app.globalData.userInfo
                                    })
                                    wx.setStorage({
                                      key: 'allInfo',
                                      data: app.globalData.userInfo
                                    })
                                  }
                                })
                                
                              }
                              else{
                                wx.hideLoading()
                              }
                            },
                          })
                          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                          // 所以此处加入 callback 以防止这种情况
                          if (this.userInfoReadyCallback) {
                            this.userInfoReadyCallback(res)
                          }
                        }
                      })
                    }
                  },
                  fail: function(){
                    console.log('未登录，无法获取用户信息')
                  },
                  complete: function(){
                    wx.hideLoading()
                  }
                })
              },
              fail: function (res) {
                var errcode = res.dataerrcode
              }
            })
          }
        })
        
        if (app.globalData.userInfo) {
          that.setData({
            userInfo: app.globalData.userInfo,
            hasUserInfo: true
          })
        } else if (that.data.canIUse){
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          app.userInfoReadyCallback = res => {
            app.globalData.userInfo = res.userInfo
            app.globalData.hasUserInfo = true
            that.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        } else {
          // 在没有 open-type=getUserInfo 版本的兼容处理
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo
              app.globalData.hasUserInfo = true
              that.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
            }
          })
        }
    }
  })
  },
  getUserInfo: function(e) {
    var that = this
    console.log('手动获取用户信息',e)
    if (e.detail.errMsg != "getUserInfo:fail auth deny"){
      app.globalData.userInfo = e.detail.userInfo
      app.globalData.hasUserInfo = true
      console.log(app.globalData.userInfo)
      if (e.detail.userInfo.gender == 1) {
        app.globalData.userInfo.gender = '男'
      }
      else {
        app.globalData.userInfo.gender = '女'
      }
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
      wx.showLoading({
        title: '获取服务器信息',
        mask: true
      })
      wx.request({
        url: server +'/Login/Login/isMember',
        data: {
          openId: app.globalData.openId,
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log('手动获取会员信息',res.data)
          if (res.data.isMember) {
            wx.request({
              url: server +'/Login/Login/getUserInfo',
              method: 'POST',
              header: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: {
                openId: app.globalData.openId
              },
              success: function (res) {
                console.log('服务器获取userInfo', res.data)
                app.globalData.userInfo = res.data
                that.setData({
                  isMember: true,
                  hasUserInfo: true,
                  userInfo: app.globalData.userInfo
                })
                wx.setStorage({
                  key: 'allInfo',
                  data: app.globalData.userInfo
                })
                app.globalData.isMember = true
              },
              complete: function(){
                wx.hideLoading()
              }
            })
            
          }
          else{
            wx.hideLoading()
          }
        },
      })
    }
  },
  reserve: function(){
    wx.navigateTo({
      url: '../reserve/reserve'
    })
  },
  about: function () {
    wx.navigateTo({
      url: '../about/about'
    })
  },
  train: function () {
    wx.navigateTo({
      url: '../train/train'
    })
  },
  photographers: function () {
    wx.navigateTo({
      url: '../photographers/photographers'
    })
  },
  onReady: function(){
    
  },
  register:function(){
    if(!app.globalData.hasUserInfo){
      wx.showModal({
        title: '提示',
        content: '请先点击获取信息',
      })
      return
    }
    else{
      wx.navigateTo({
        url: 'register/register',
      })
    }
  },
  onShow:function(){
    var that = this
    
    wx.request({
      url: server +'/Login/Login/getUserInfo',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        openId: app.globalData.openId
      },
      success: function (res) {
        wx.hideLoading()
        console.log('服务器获取userinfo', res.data)
        if(res.data == false){
          wx.removeStorageSync('allInfo')
          that.data.isMember=false
          that.setData({
            ismember:false
          })
          return
        }
        
        app.globalData.userInfo = res.data
        that.setData({
          isMember: true,
          hasUserInfo: true,
          userInfo: app.globalData.userInfo
        })
        wx.setStorage({
          key: 'allInfo',
          data: app.globalData.userInfo
        })
      }
    })

    wx.getStorage({
      key: 'allInfo',
      success: function (res) {
        console.log('allInfo读取成功', res.data)
        app.globalData.userInfo = res.data
        app.globalData.openId = res.data.openId
        app.globalData.hasUserInfo = true
        app.globalData.isMember = true
        that.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true,
          isMember: true
        })
      }
  })
  }
})
