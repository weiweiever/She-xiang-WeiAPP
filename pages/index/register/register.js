// pages/index/register/register.js
const app = getApp()
const server = require('../../../utils/util.js').server
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:['江安校区','望江校区','华西校区','其他'],
    college: ['经济学院','化学工程学院','法学院','轻纺与食品学院','文学与新闻学院','高分子科学与工程学院','外国语学院','华西基础医学与法医学院','艺术学院','华西临床医学院(华西医院)','历史文化学院(旅游学院)','华西第二医院','数学学院','华西口腔医学院（华西口腔医院）','物理科学与技术学院(核科学与工程技术学院)','华西公共卫生学院(华西第四医院)','化学学院','华西药学院','生命科学学院','公共管理学院','电子信息学院','商学院','材料科学与工程学院','马克思主义学院','制造科学与工程学院','体育学院','电气信息学院','灾后重建与管理学院','计算机学院','软件学院','空天科学与工程学院','建筑与环境学院','匹兹堡学院','水利水电学院','国际关系学院','网络空间安全学院'],
    gender:['未知','男','女']
  },
  bindRegionChange:function(e){
    this.setData({
      regionValue: e.detail.value
    })
  },
  bindCollegeChange(e){
    this.setData({
      collegeValue: e.detail.value
    })
  },
  formsubmit:function(e){
    var that = this
    console.log('所填写的信息',e.detail.value)
    if (e.detail.value.truename == "") {
      wx.showToast({
        title: "请填写您的姓名！",
        icon: 'none',
      })
      return
    } else if (e.detail.value.region == null) {
      wx.showToast({
        title: "请选择所在校区！",
        icon: 'none',
      })
      return
    } else if (!/^[1][0-9]{10}$/.test(e.detail.value.phoneNumber) && e.detail.value.phoneNumber!=''){
      wx.showToast({
        title: '请输入正确手机号码！',
        icon: 'none',
      })
      return
    } else if (e.detail.value.college == null) {
      wx.showToast({
        title: "请选择所在学院！",
        icon: 'none',
      })
      return
    } else if (e.detail.value.qq == '') {
      wx.showToast({
        title: "请填写QQ号码！",
        icon: 'none',
      })
      return
    }
    wx.getSystemInfo({
      success: function(res) {
        app.globalData.device=res.brand + ' ' + res.model
      },
    })
    wx.showModal({
      title: '提示',
      content: '姓名、学号一旦提交不可修改，您确定继续吗？',
      success:function(res){
        if(res.confirm){
          var info = {
            openId: app.globalData.openId,
            trueName:e.detail.value.trueName,
            gender:app.globalData.userInfo.gender,
            region: that.data.region[e.detail.value.region],
            studentId:e.detail.value.studentId,
            phoneNumber: e.detail.value.phoneNumber,
            college: that.data.college[e.detail.value.college],
            major: e.detail.value.major,
            qq: e.detail.value.qq,
            email: e.detail.value.email,
            nickName: app.globalData.userInfo.nickName,
            avatarUrl: app.globalData.userInfo.avatarUrl,
            province: app.globalData.userInfo.province,
            city: app.globalData.userInfo.city,
            device: app.globalData.device
          }
          
          app.globalData.userInfo = info
          console.log('要提交的信息', info)
          wx.request({
            url: server +'/Login/Login/register',
            method: 'POST',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: info,
            success: function (res) {
              console.log('注册返回的信息', res.data)
              if (!isNaN(res.data)) {
                console.log('是数字', res.data, '注册成功')
                app.globalData.isMember = true
                app.globalData.hasUserInfo = true
                wx.showToast({
                  title: '注册成功！',
                })
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
                    app.globalData.userInfo = res.data
                    wx.setStorage({
                      key: 'allInfo',
                      data: res.data
                    })
                    app.globalData.isMember = true
                    app.globalData.hasUserInfo=true
                  },
                  complete: function () {
                    wx.hideLoading()
                  }
                })                
                    wx.navigateTo({
                  url: '../index'
                })
              }
              else {
                console.log('不是数字', res.data, '注册失败')
                if (res.data == 'error:already existed'){
                  wx.showToast({
                    title: '失败！您已注册',
                    icon:'none'
                  })
                }else{
                  wx.showToast({
                    title: '注册失败！',
                    icon: 'none'
                  })
                }
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