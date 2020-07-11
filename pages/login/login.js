const {
  sendCode
} = require('../../api/user');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonenumber: '',
    captcha: '',
    buttonvalue: '发送验证码'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onChange(event) {
    // event.detail 为当前输入的值
    this.setData({
      phonenumber: event.detail
    });
  },
  // 发送验证码计时
  sendCode: function () {
    if (this.data.phonenumber === "") return;
    sendCode(this.data.phonenumber, (res) => {
      console.log(res)
    })
    let that = this;
    let buttonvalue = '60'
    that.setData({
      timer: setInterval(function () {
        buttonvalue--;
        that.setData({
          buttonvalue: buttonvalue + 's'
        })
        if (buttonvalue == 0) {
          clearInterval(that.data.timer);
          that.setData({
            buttonvalue: '发送验证码'
          })
        }
      }, 1000)
    })
  },
  onChangeCode(e) {
    this.setData({
      captcha: e.detail
    })
  },
  onlogin: function () {
    console.log(this);
    var phone = this.data.phonenumber;
    var setcode = this.data.captcha;
    console.log(phone);
    console.log(setcode)
    wx.request({
      url: app.config.apiUrl + '/app/v1_0/authorizations',
      data: {
        mobile: this.data.phonenumber,
        code: this.data.captcha,
      },
      method: 'POST',
      success: function (res) {
        if (res.statusCode === '200' || '201') {
          wx.showToast({
            title: '验证成功',
            icon: 'success',
          })
          // 存入setStorage
          wx.setStorage({
            key: 'token',
            data: res.data.data, //存第三条数据
          })
          wx.navigateTo({
            url: '../index/index'
          })
        } else {
          wx.showToast({
            title: '登录失败',
            icon: 'waring'
          })
        }
      
      },
      fail: function (res) {
        console.log(res)
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