// pages/my/photowall/photowall.js
const app = getApp()
const server = require('../../../utils/util.js').server
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img1: '../apply/default.jpg',
    img2: '../apply/default.jpg',
    img3: '../apply/default.jpg',
    img4: '../apply/default.jpg',
    img5: '../apply/default.jpg',
    img6: '../apply/default.jpg',
    path:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
      wx.request({
        url: server + '/UpLoad/UpLoad/getInfo',
        data: {
          id: app.globalData.userInfo.id
        },
        success: function (res) {
          console.log(res.data)
          if (!isNaN(res.data.code) && res.data.code == 0) {
            that.setData({
              img1: res.data.data.img1,
              img2: res.data.data.img2,
              img3: res.data.data.img3,
              img4: res.data.data.img4,
              img5: res.data.data.img5,
              img6: res.data.data.img6,
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
  },
  img:function(e){
    var idx = e.currentTarget.dataset.idx
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.data.path = res.tempFilePaths[0]
        switch (idx){
          case '1':
            that.data.img1 = res.tempFilePaths[0]
            break;
          case '2':
            that.data.img2 = res.tempFilePaths[0]
            break;
          case '3':
            that.data.img3 = res.tempFilePaths[0]
            break;
          case '4':
            that.data.img4 = res.tempFilePaths[0]
            break;
          case '5':
            that.data.img5 = res.tempFilePaths[0]
            break;
          case '6':
            that.data.img6 = res.tempFilePaths[0]
            break;
        }
        console.log('路径', that.data.path)
        wx.showLoading({
          title: '图片上传中...',
          mask: true
        })
        wx.uploadFile({
          url: server + '/UpLoad/UpLoad/imgWall',
          filePath: that.data.path,
          name: 'photo',
          header: {
            'content-type': 'multipart/form-data'
          },
          formData: {
            idx: e.currentTarget.dataset.idx,
            id: app.globalData.userInfo.id,
            openId: app.globalData.userInfo.openId
          },
          success: function (res) {
            wx.hideLoading()
            console.log(res.data)
            if(res.data==0){
              wx.showToast({
                title: '上传成功',
              })
              that.setData({
                img1: that.data.img1,
                img2: that.data.img2,
                img3: that.data.img3,
                img4: that.data.img4,
                img5: that.data.img5,
                img6: that.data.img6,
              })
            } else{
              wx.showModal({
                title: '提示',
                content: '发生错误，请重试，注意图片不能过大',
              })
            }
            
          }
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