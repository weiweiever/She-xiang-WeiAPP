// pages/train/apply/apply.js
const app=getApp()
const server = require('../../../utils/util.js').server
Page({

  /**
   * 页面的初始数据
   */
  data: {
    times: ['周一6：00 - 10：00','周一10：00 - 12：00','周一12：00 - 13：30','周一13：30 - 16：00','周一16：00 - 18：00','周一18：00 - 21：00','周二6：00 - 10：00','周二10：00 - 12：00','周二12：00 - 13：30','周二13：30 - 16：00','周二16：00 - 18：00','周二18：00 - 21：00','周三6：00 - 10：00','周三10：00 - 12：00','周三12：00 - 13：30','周三13：30 - 16：00','周三16：00 - 18：00','周三18：00 - 21：00','周四6：00 - 10：00','周四10：00 - 12：00','周四12：00 - 13：30','周四13：30 - 16：00','周四16：00 - 18：00','周四18：00 - 21：00','周五6：00 - 10：00','周五10：00 - 12：00','周五12：00 - 13：30','周五13：30 - 16：00','周五16：00 - 18：00','周五18：00 - 21：00','周六6：00 - 10：00','周六10：00 - 12：00','周六12：00 - 13：30','周六13：30 - 16：00','周六16：00 - 18：00','周六18：00 - 21：00','周日6：00 - 10：00','周日10：00 - 12：00','周日12：00 - 13：30','周日13：30 - 16：00','周日16：00 - 18：00','周日18：00 - 21：00'],
    img:"./default.jpg",
    intro:"",
    choices:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: server + '/UpLoad/UpLoad/getInfo',
      data:{
        id:app.globalData.userInfo.id
      },
      success:function(res){
        console.log(res.data)
        if (!isNaN(res.data.code) && res.data.code==0){
          that.data.img = res.data.data.avatarurl
          that.data.intro = res.data.data.intro
          that.data.choices = res.data.data.freetime.split(',')
          that.setData({
            times: that.data.times,
            img: that.data.img,
            intro: that.data.intro,
            choices: that.data.choices
          })
        }
        if (!isNaN(res.data.code) && res.data.code == 1) {
          wx.showModal({
            title: '提示',
            content: '您还没有服务权限！请在工作人员审核通过后再试',
            showCancel: false,
            success: function (res) {
              wx.navigateBack()
            }
          })
        }
      }
    })
    wx.showModal({
      title: '提示',
      content: '请确认您已经过我们的审核并通过（填写纸质登记表），否则即使提交也是无效的！',
    })
  },
  //表单提交
  formsubmit:function(e){
    var that = this
    console.log(e.detail.value)
    if(e.detail.value.choices==""){
      wx.showToast({
        title: '至少选一个时间',
        icon: 'none'
      })
      return
    }
    var info=e.detail.value
    info.choices = info.choices.join(",")
    console.log('修改',info)
    wx.request({
      url: server + '/index.php/UpLoad/UpLoad/fix',
      method:'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data:{
        id:app.globalData.userInfo.id,
        intro:info.intro,
        choices:info.choices
      },
      success:function(res){
        console.log(res.data)
        wx.showToast({
          title: '修改成功！',
        })
      }
    })
  },
  //选择图片
  bindImgTap:function(){
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.data.img= res.tempFilePaths[0]
        console.log('路径',res.tempFilePaths[0])
        wx.showLoading({
          title: '图片上传中...',
          mask:true
        })
        wx.uploadFile({
          url: server + '/UpLoad/UpLoad/ServeImg',
          filePath: that.data.img,
          name: 'photo',
          header: {
            'content-type': 'multipart/form-data'
          },
          formData:{
            id: app.globalData.userInfo.id,
            openId:app.globalData.userInfo.openId
          },
          success:function(res){
            wx.hideLoading()
            console.log(res.data)
            if (res.data==0) {
              wx.showToast({
                title: '上传成功',
              })
            } else {
              wx.showToast({
                title: '发生错误，请重试',
                icon: 'none'
              })
            }
          }
        })
        that.setData({
          img: res.tempFilePaths[0]
        })
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